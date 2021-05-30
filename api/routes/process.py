from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders
from blubber_orm import Items, Tags

from api.tools.settings import get_orders_for_dropoff, get_orders_for_pickup, get_delivery_schedule
from api.tools.settings import lock_checkout, check_if_routed, exp_decay
from api.tools.settings import login_required, transaction_auth, AWS
from api.tools.build import create_order, create_logistics, create_reservation
from api.tools import blubber_instances_to_dict

bp = Blueprint('process', __name__)

#Accepts payment choice from the checkout form
@bp.route("/checkout/router&token=<token>&method=<payment_method>")
@transaction_auth
@login_required
def order_router(token, payment_method):
    cart_response = lock_checkout(g.user)
    if cart_response["is_valid"]:
        #Redirect depending on payment method
        if method == "online":
            return redirect(f"/checkout/payment&token={token}")
        else:
            # default to in-person payment, skip to confirmation
            for item in g.user.cart.contents:
                item.is_routed = True
            return redirect(f"/checkout/confirmation&token={token}&method={method}")
    else:
        flash(cart_response["message"])
        return redirect("/checkout")


#Accepts payment choice from the checkout form
@bp.route("/checkout/payment&token=<token>")
@transaction_auth
@login_required
def order_payment(token):
    pass #TODO: payment method API in here and route items in cart

@bp.route("/checkout/confirmation&token=<token>&method=<payment_method>")
@transaction_auth
@login_required
def order_confirmation(token, payment_method):
    cart_data = {}
    routing_response = check_if_routed(g.user)
    if routing_response["is_valid"]:
        _cart_contents = g.user.cart.contents # need this because cart size changes
        for item in _cart_contents:
            _reservation = Reservations.filter({
                "renter_id": g.user.id,
                "item_id": item.id,
                "is_in_cart": True
            })
            reservation, = _reservation
            item.calendar.add(reservation)
            order_data = {
                "res_date_start": reservation.date_started,
                "res_date_end": reservation.date_ended,
                "renter_id": reservation.renter_id,
                "item_id": reservation.item_id,
                "is_online_pay": payment_method,
                "lister_id": item._lister_id,
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
            g.user.cart.remove(reservation)
            item.unlock()
        #TODO: send email receipt to renter
        flash("Successfully rented all items! Now, just let us know when we can drop them off.")
        return redirect("/schedule/dropoff")
    else:
        flash(routing_response["message"])
        return redirect("/checkout")

@bp.route("/schedule/dropoffs", methods=["POST", "GET"])
@login_required
def schedule_dropoffs():
    format = "%Y-%m-%d"
    orders_grouped_by_date = get_orders_for_dropoff(g.user.id) # by start date
    if orders_grouped_by_date:
        am_slots = ["8-9am","9-10am", "10-11am", "11-12pm", "12-1pm"]
        pm_slots = ["1-2pm", "2-3pm", "3-4pm", "4-5pm", "5-6pm"]

        if request.method == "POST":
            availabilities = request.form.getlist("availability")
            timeslots_grouped_by_date = get_delivery_schedule(availabilities)

            for date_str in timeslots_grouped_by_date.keys():
                logistics_data = {
                    "notes": request.form.get("notes"),
                    "referral": request.form.get("referral"),
                    "timeslots": timeslots_grouped_by_date[date_str],
                    "renter_id": g.user.id,
                    "chosen_time": None,
                    "address_num": request.form.get("address_num"),
                    "address_street": request.form.get("address_street"),
                    "address_apt": request.form.get("address_apt"),
                    "address_zip": request.form.get("address_zip")
                }
                orders = orders_grouped_by_date[date_str]
                dropoff_date = datetime.strptime(date_str, format)
                dropoff_logistics = create_logistics(logistics_data, orders, dropoff=dropoff_date)

            #TODO: async send availability details to user
            #logistics_email_data = get_renter_logistics(g.user, form_data)
            #send_async_email.apply_async(kwargs=logistics_email_data)
            #TODO: send return procedure email
            return redirect(f"/accounts/u/{g.user.make_username()}")
        elif request.method == "GET":
            items = {}
            for date_str in orders_grouped_by_date.keys():
                orders = orders_grouped_by_date[date_str]
                orders_grouped_by_date[date_str] = blubber_instances_to_dict(orders)
                for order in orders:
                    items[order.item_id] = Items.get(order.item_id).to_dict()
            return {
                "orders_grouped_by_date": orders_grouped_by_date,
                "items": items,
                "am_slots": am_slots,
                "pm_slots": pm_slots,
            }
        return redirect("/inventory") # only take post and get requests
    else:
        flash("No rentals need dropoff scheduling right now. Check out inventory to rent something!")
        return redirect(f"/accounts/u/{g.user.make_username()}")

@bp.route("/accounts/u/rentals")
@login_required
def active_rentals():
    photo_url = AWS.get_url("items")
    orders_grouped_by_date = get_orders_for_pickup(g.user.id) # by end date
    if orders:
        for date_str in orders_grouped_by_date.keys():
            orders = orders_grouped_by_date[date_str]
            orders_grouped_by_date[date_str] = blubber_instances_to_dict(orders)
            for order in orders:
                items[order.item_id] = Items.get(order.item_id).to_dict()
        return {
            "photo_url": photo_url,
            "orders_grouped_by_date": orders_grouped_by_date,
            "items": items,
        }
    else:
        flash("No rentals need pickup scheduling right now. Check out inventory to rent something!")
        return redirect(f"/accounts/u/{g.user.make_username()}")

@bp.route("/schedule/pickups/<date_str>", methods=["POST", "GET"])
@login_required
def schedule_pickups(date_str):
    format = "%Y-%m-%d"
    pickup_date = datetime.strptime(date_str, format).date()
    orders_grouped_by_date = get_orders_for_pickup(g.user.id)
    if orders_grouped_by_date:
        am_slots = ["8-9am","9-10am", "10-11am", "11-12pm", "12-1pm"]
        pm_slots = ["1-2pm", "2-3pm", "3-4pm", "4-5pm", "5-6pm"]
        orders = orders_grouped_by_date[date_str]

        if request.method == "POST":
            availabilities = request.form.getlist("availability")
            timeslots_grouped_by_date = get_delivery_schedule(availabilities)

            logistics_data = {
                "notes": request.form.get("notes"),
                "referral": None,
                "timeslots": timeslots_grouped_by_date[date_str],
                "renter_id": g.user.id,
                "chosen_time": None,
                "address_num": request.form.get("address_num"),
                "address_street": request.form.get("address_street"),
                "address_apt": request.form.get("address_apt"),
                "address_zip": request.form.get("address_zip")
            }
            pickup_logistics = create_logistics(logistics_data, orders, pickup=pickup_date)

            #TODO: async send availability details to user
            #logistics_email_data = get_renter_logistics(g.user, form_data)
            #send_async_email.apply_async(kwargs=logistics_email_data)
            #TODO: send return procedure email
            return redirect(f"/accounts/u/{g.user.make_username()}")
        elif request.method == "GET":
            for order in orders:
                items.append(Items.get(order.item_id).to_dict())
        return {
            "orders": blubber_instances_to_dict(orders),
            "items": items,
            "am_slots": am_slots,
            "pm_slots": pm_slots,
        }
    else:
        flash("No rentals need pickup scheduling right now. Check out inventory to rent something!")
        return redirect(f"/accounts/u/{g.user.make_username()}")

@bp.route("/accounts/o/extend/id=<int:order_id>", methods=["POST", "GET"])
@login_required
def extend_order(order_id):
    format = "%m/%d/%Y"
    ext_reservation = None
    order = Orders.get(order_id)
    item = Items.get(order.item_id)
    if g.user.id == order.renter_id:
        if request.method == "POST":
            ext_date_end_str = request.form.get("ext_date_end")
            ext_date_end = datetime.strptime(ext_date_end_str, format).date()
            ext_rental_data = {
                "renter_id": g.user.id,
                "item_id": item.id,
                "date_started": order.ext_date_end, # will return order.res_date_end if no ext
                "date_ended": ext_date_end
            }
            ext_reservation, action, waitlist_ad = create_reservation(ext_rental_data)
            if ext_reservation:
                ext_reservation = ext_reservation.to_dict()
            else:
                flash(Markup(waitlist_ad))
                flash("Sorry, you cannot extend for that time period.")
            flash(action)
        return {
            "ext_reservation": ext_reservation,
            "order": order.to_dict(),
            "item": item.to_dict()
        } # tells the user how much extension will cost, then they can confirm or not
    else:
        flash("You can only manage orders that you placed.")
        return redirect(f"/accounts/u/{g.user.make_username()}")

# Navigate here via, "extend now" button on frontend
@bp.route("/extend/o/processor/id=<int:order_id>&start=<start>&end=<end>")
@login_required
def extension_processor(order_id, start, end):
    format = "%Y-%m-%d"
    order = Orders.get(order_id)
    ext_reservation_keys = {
        "renter_id": g.user.id,
        "item_id": order.item_id,
        "date_started": datetime.strptime(start, format).date(),
        "date_ended": datetime.strptime(end, format).date()
    }
    item = Items.get(order.item_id)
    ext_reservation = Reservations.get(reservation_keys)
    if ext_reservation:
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
            #TODO: email notification about extension
            flash(f"Your {item.name} was successfully extended!")
            return redirect(f"/accounts/u/{g.user.make_username()}")
        else:
            flash(f"Sorry, it seems someone just got to the {item.name} before you.")
            return redirect(f"/accounts/u/{g.user.make_username()}")
    else:
        flash("Couldn't find that reservation. Try extending again.")
        return redirect(f"/accounts/o/extend/id={order_id}")

    #         #async schedule return procedure email notice
    #         orders_by_end_date = get_ending_orders(g.user.id)
    #         for end_date_str, orders in orders_by_end_date.items():
    #             filing_date_str = date.today().strftime("%B %-d, %Y")
    #             orders.sort(key = lambda order: (order.item_reservation_end - order.item_reservation_start).days)
    #             min_rental_duration = (orders[0].item_reservation_end - orders[0].item_reservation_start).days
    #             if min_rental_duration <= 7: #7 days is a cutoff, under which we want more notice not 3/4th way in
    #                 notice_offset = min_rental_duration - 1
    #             else:
    #                 notice_offset = round(min_rental_duration * 0.25)
    #             return_clock = datetime.strptime(end_date_str, "%Y-%m-%d") - timedelta(days=notice_offset)
    #             item_names_list = [order.item_name for order in orders]
    #             return_data = {
    #                 "renter_name" : g.user.get_name().title(),
    #                 "renter_email" : g.user.email,
    #                 "filing_date" : filing_date_str,
    #                 "rental_end_date" : end_date_str,
    #                 "remaining_days" : notice_offset,
    #                 "item_names" : ", ".join(item_names_list)
    #                 }
    #             return_email_data = get_renter_notice(return_data)
    #             send_async_email.apply_async(eta=return_clock, kwargs=return_email_data)
    #         flash("Check your email to see your receipt and drop-off scheduling! Thanks!")
    #         return redirect("/thank-you")
    #     return render_template("rent/dropoff.html",
    #         recent_orders_dates=recent_orders_dates,
    #         formatted_dates=formatted_dates,
    #         recent_orders=recent_orders,
    #         am_slots=am_slots,
    #         pm_slots=pm_slots
    #         )
    # else:
    #     flash("You don't have any recent orders that need drop-off logistics.")
    #     return redirect("/checkout") #TODO: bounce to another page
