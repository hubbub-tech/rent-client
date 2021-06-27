from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders, Reservations
from blubber_orm import Items, Tags

from api.tools.settings import get_orders_for_dropoff, get_orders_for_pickup, get_delivery_schedule
from api.tools.settings import lock_checkout, check_if_routed, exp_decay
from api.tools.settings import login_required, transaction_auth, AWS
from api.tools.build import create_order, create_logistics, create_reservation
from api.tools import blubber_instances_to_dict, json_date_to_python_date

bp = Blueprint('process', __name__)

#Accepts payment choice from the checkout form
@bp.route("/checkout/router/token=<token>")
@transaction_auth
@login_required
def order_router(token):
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    cart_response = lock_checkout(user)
    if cart_response["is_valid"]:
        #Redirect depending on payment method
        if method == "online":
            return redirect(f"/checkout/payment/token={token}")
        else:
            # default to in-person payment, skip to confirmation
            for item in user.cart.contents:
                item.is_routed = True
            return redirect(f"/checkout/confirmation/token={token}")
    else:
        flash(cart_response["message"])
        return redirect("/checkout")


#Accepts payment choice from the checkout form
@bp.route("/checkout/payment/token=<token>")
@transaction_auth
@login_required
def order_payment(token):
    pass #TODO: payment method API in here and route items in cart

@bp.route("/checkout/confirmation/token=<token>")
@transaction_auth
@login_required
def order_confirmation(token):
    flashes = []
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    cart_response = lock_checkout(user)
    if cart_response["is_valid"]:
        cart_data = {}
        _cart_contents = user.cart.contents # need this because cart size changes
        for item in _cart_contents:
            _reservation = Reservations.filter({
                "renter_id": g.user_id,
                "item_id": item.id,
                "is_in_cart": True
            })
            reservation, = _reservation
            item.calendar.add(reservation)
            print(f"it added the res for {item.name}")
            order_data = {
                "res_date_start": reservation.date_started,
                "res_date_end": reservation.date_ended,
                "renter_id": reservation.renter_id,
                "item_id": reservation.item_id,
                "is_online_pay": False,
                "lister_id": item.lister_id,
                "date_placed": date.today(),
            }
            order = create_order(order_data)
            transaction_summary = {
                "item": item,
                "order": order,
                "start": reservation.date_started,
                "end": reservation.date_ended,
                "cost": reservation.print_charge(),
                "deposit": reservation.print_deposit()
            }
            #TODO: send email receipt to lister
            cart_data[str(order.id)] = transaction_summary # important for renters receipt
            user.cart.remove(reservation)
            item.unlock()
        #TODO: send email receipt to renter
        session["cart_size"] = 0
        flashes.append("Successfully rented all items! Now, just let us know when we can drop them off.")
        return {"flashes": flashes}, 201
    else:
        flashes.append(cart_response["message"])
        return {"flashes": flashes}, 406

@bp.route("/accounts/u/orders")
@login_required
def order_history():
    photo_url = AWS.get_url("items")
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    order_history = Orders.filter({"renter_id": g.user_id})
    orders = []
    if order_history:
        for order in order_history:
            item = Items.get(order.item_id)
            item_to_dict = item.to_dict()
            item_to_dict["calendar"] = item.calendar.to_dict()
            item_to_dict["details"] = item.details.to_dict()

            order_to_dict = order.to_dict()
            order_to_dict["ext_date_end"] = order.ext_date_end.strftime("%Y-%m-%d")
            order_to_dict["reservation"] = order.reservation.to_dict()
            order_to_dict["lister"] = order.lister.to_dict()
            order_to_dict["item"] = item_to_dict

            orders.append(order_to_dict)
    return {
        "photo_url": photo_url,
        "orders": orders
    }

@bp.get("/accounts/o/id=<int:order_id>")
@login_required
def manage_order(order_id):
    photo_url = AWS.get_url("items")
    flashes = []
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    order = Orders.get(order_id)
    item = Items.get(order.item_id)
    if g.user_id == order.renter_id:
        item_to_dict = item.to_dict()
        item_to_dict["calendar"] = item.calendar.to_dict()
        item_to_dict["details"] = item.details.to_dict()

        order_to_dict = order.to_dict()
        order_to_dict["ext_date_end"] = order.ext_date_end.strftime("%Y-%m-%d")
        order_to_dict["reservation"] = order.reservation.to_dict()
        order_to_dict["lister"] = order.lister.to_dict()
        order_to_dict["item"] = item_to_dict
        return {
            "order": order_to_dict,
            "photo_url": photo_url
        }
    else:
        flashes.append("You can only manage orders that you placed.")
        return {"flashes": flashes}, 406

@bp.get("/schedule/dropoffs/<date_str>")
@login_required
def schedule_dropoffs(date_str):
    format = "%Y-%m-%d"
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    res_date_start = datetime.strptime(date_str, format).date()
    orders = Orders.filter({
        "renter_id": g.user_id,
        "is_dropoff_sched": False,
        "res_date_start": res_date_start
    })
    orders_to_dropoff = []
    for order in orders:
        order_to_dict = order.to_dict()
        item = Items.get(order.item_id)
        order_to_dict["item"] = item.to_dict()
        order_to_dict["reservation"] = order.reservation.to_dict()
        orders_to_dropoff.append(order_to_dict)
    return {
        "address": user.address.to_dict(),
        "orders_to_dropoff": orders_to_dropoff
    }

@bp.post("/schedule/dropoffs/submit")
@login_required
def schedule_dropoffs_submit():
    format = "%Y-%m-%d"
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    flashes = []
    data = request.json
    if data:
        logistics_data = {
            "logistics" : {
                "notes": data["notes"],
                "referral": data["referral"],
                "timeslots": data["timesChecked"],
                "renter_id": g.user_id,
                "chosen_time": None,
                "address_num": data["address"]["num"],
                "address_street": data["address"]["street"],
                "address_apt": data["address"]["apt"],
                "address_zip": data["address"]["zip_code"]
            },
            "address": {
                "num": data["address"]["num"],
                "street": data["address"]["street"],
                "apt": data["address"]["apt"],
                "city": data["address"]["city"],
                "state": data["address"]["state"],
                "zip": data["address"]["zip_code"]
            }
        }
        orders = [Orders.get(order["id"]) for order in data["orders"]]
        dropoff_date = datetime.strptime(data["dropoffDate"], format)
        dropoff_logistics = create_logistics(logistics_data, orders, dropoff=dropoff_date)

        #TODO: async send availability details to user
        #logistics_email_data = get_renter_logistics(g.user, form_data)
        #send_async_email.apply_async(kwargs=logistics_email_data)
        #TODO: send return procedure email

        flashes.append("You have successfully scheduled your rental dropoffs!")
        return {"flashes": flashes}, 201
    else:
        flashes.append("Please, provide availabilities for dropoff.")
        return {"flashes": flashes}, 406

@bp.get("/schedule/pickups/<date_str>")
@login_required
def schedule_pickups(date_str):
    format = "%Y-%m-%d"
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    res_date_end = datetime.strptime(date_str, format).date()
    orders = Orders.filter({"renter_id": g.user_id, "is_pickup_sched": False})
    orders_to_pickup = []
    for order in orders:
        if order.ext_date_end == res_date_end:
            order_to_dict = order.to_dict()
            item = Items.get(order.item_id)
            order_to_dict["item"] = item.to_dict()
            order_to_dict["reservation"] = order.reservation.to_dict()
            orders_to_pickup.append(order_to_dict)
    return {
        "address": user.address.to_dict(),
        "orders_to_pickup": orders_to_pickup
    }

@bp.post("/schedule/pickups/submit")
@login_required
def schedule_pickups_submit():
    format = "%Y-%m-%d"
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    flashes = []
    data = request.json
    if data:
        logistics_data = {
            "logistics" : {
                "notes": data["notes"],
                "referral": "N/A",
                "timeslots": data["timesChecked"],
                "renter_id": g.user_id,
                "chosen_time": None,
                "address_num": data["address"]["num"],
                "address_street": data["address"]["street"],
                "address_apt": data["address"]["apt"],
                "address_zip": data["address"]["zip_code"]
            },
            "address": {
                "num": data["address"]["num"],
                "street": data["address"]["street"],
                "apt": data["address"]["apt"],
                "city": data["address"]["city"],
                "state": data["address"]["state"],
                "zip": data["address"]["zip_code"]
            }
        }
        orders = [Orders.get(order["id"]) for order in data["orders"]]
        pickup_date = datetime.strptime(data["pickupDate"], format)
        pickup_logistics = create_logistics(logistics_data, orders, pickup=pickup_date)

        #TODO: async send availability details to user
        #logistics_email_data = get_renter_logistics(g.user, form_data)
        #send_async_email.apply_async(kwargs=logistics_email_data)
        #TODO: send return procedure email

        flashes.append("You have successfully scheduled your rental pickup!")
        return {"flashes": flashes}, 201
    else:
        flashes.append("Please, provide availabilities for pickup.")
        return {"flashes": flashes}, 406

@bp.post("/accounts/o/extend/confirmation")
@login_required
def extend_confirmation():
    flashes = []
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    data = request.json
    if data:
        item_id = data["itemId"]
        item = Items.get(item_id)
        if item.is_locked == False:
            item.lock(user)
            order_id = data["orderId"]
            order = Orders.get(order_id)
            ext_date_end = json_date_to_python_date(data["extendDate"])
            ext_reservation_keys = {
                "renter_id": g.user_id,
                "item_id": item.id,
                "date_started": order.ext_date_end, # will return order.res_date_end if no ext
                "date_ended": ext_date_end
            }
            ext_reservation = Reservations.get(reservation_keys)
            if item.calendar.scheduler(ext_reservation):
                item.calendar.add(ext_reservation)
                ext_data = {
                    "res_date_end": ext_reservation.date_ended,
                    "res_date_start": ext_reservation.date_started,
                    "renter_id": order.renter_id,
                    "item_id": order.item_id,
                    "order_id": order_id
                }
                extension = create_extension(ext_data)
                flashes.append(f"Your {item.name} was successfully extended!")
            else:
                flashes.append(f"Sorry, you cannot extend this rental. It seems someone just got to the {item.name} before you.")
        else:
            flashes.append("It looks like someone else is ordering the item right now.")
    return None
