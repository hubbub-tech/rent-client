from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session

from blubber_orm import Users, Orders, Reservations
from blubber_orm import Items, Tags, Details, Calendars

from api.tools.settings import create_rental_token
from api.tools.settings import login_required, search_items, AWS
from api.tools.build import create_reservation, validate_rental_bounds
from api.tools import blubber_instances_to_dict, json_date_to_python_date, is_item_in_itemlist

bp = Blueprint('rent', __name__)

@bp.get("/inventory", defaults={"search": None})
@bp.get("/inventory/search=<search>")
def inventory(search):
    photo_url = AWS.get_url("items")
    if search:
        listings = search_items(search)
    else:
        listings = Items.filter({"is_available": True})
    listings_to_dict = []
    for item in listings:
        lister = Users.get(item.lister_id)
        item_to_dict = item.to_dict()
        next_start, next_end  = item.calendar.next_availability()
        item_to_dict["next_available_start"] = next_start.strftime("%Y-%m-%d")
        item_to_dict["next_available_end"] = next_end.strftime("%Y-%m-%d")
        item_to_dict["details"] = item.details.to_dict()
        item_to_dict["lister"] = lister.to_dict()
        item_to_dict["lister"]["name"] = lister.name

        listings_to_dict.append(item_to_dict)
    return {
        "items": listings_to_dict,
        "photo_url": photo_url
        }

@bp.get("/inventory/i/id=<int:item_id>")
def view_item(item_id):
    photo_url = AWS.get_url("items")
    item = Items.get(item_id)
    lister = Users.get(item.lister_id)
    item = item.to_dict()
    item["lister_name"] = lister.name
    details = Details.get(item_id)
    calendar = Calendars.get(item_id)
    next_start, next_end = calendar.next_availability()
    details = details.to_dict()
    calendar = calendar.to_dict()
    calendar["next_available_start"] = next_start.strftime("%Y-%m-%d")
    calendar["next_available_end"] = next_end.strftime("%Y-%m-%d")
    return {
        "item": item,
        "details": details,
        "calendar": calendar,
        "photo_url": photo_url
    }

@bp.post("/validate/i/id=<int:item_id>")
@login_required
def validate(item_id):
    flashes = []
    errors = []
    code = 406
    reservation = None
    g.user_id = session.get('user_id')
    data = request.json
    if data:
        date_started = json_date_to_python_date(data["startDate"])
        date_ended = json_date_to_python_date(data["endDate"])

        item = Items.get(item_id)
        rental_range = {
            "date_started": date_started,
            "date_ended": date_ended
        }
        form_check = validate_rental_bounds(item, rental_range)
        if form_check["is_valid"]:
            rental_data = {
                "renter_id": g.user_id,
                "item_id": item.id,
                "date_started": date_started,
                "date_ended": date_ended
            }
            reservation, action, waitlist_ad = create_reservation(rental_data)
            if reservation:
                reservation = reservation.to_dict()
                code = 201
            else:
                flashes.append(waitlist_ad)
            flashes.append(action)
        else:
            flashes.append(form_check["message"])
    else:
        errors = ["Nothing was entered! We need input to log you in."]
    return {
        "reservation": reservation,
        "flashes": flashes,
        "errors": errors
    }, code

@bp.post("/add/i/id=<int:item_id>")
@login_required
def add_to_cart(item_id):
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    item = Items.get(item_id)
    data = request.json
    if data["startDate"] and data["endDate"]:
        date_started = json_date_to_python_date(data["startDate"])
        date_ended = json_date_to_python_date(data["endDate"])
        if user.cart.contains(item):
            message = "The item is already in your cart."
        else:
            reservation_keys = {
                "renter_id": g.user_id,
                "item_id": item_id,
                "date_started": date_started,
                "date_ended": date_ended
            }
            reservation = Reservations.get(reservation_keys) #NOTE: assumes res exists
            user.cart.add(reservation)
            message = "The item has been added to your cart!"
    else:
        if user.cart.contains(item):
            message = "The item is already in your cart."
        else:
            user.cart.add_without_reservation(item)
            message = "The item has been added to your cart!"
    session["cart_size"] = user.cart.size()
    return {"flashes": [message]}, 201

#TODO: in the new version of the backend, user must propose new dates to reset
#takes data from changed reservation by deleting the temporary res created previously
@bp.post("/update/i/id=<int:item_id>")
@login_required
def update(item_id):
    flashes = []
    errors = []
    code = 406
    reservation = None
    g.user_id = session.get('user_id')
    user = Users.get(g.user_id)
    data = request.json
    if data:
        item = Items.get(item_id)
        #NOTE: filter always returns a list but should only have 1 item this time
        _reservation = Reservations.filter({
            "item_id": item_id,
            "renter_id": g.user_id,
            "is_in_cart": True
        })
        if _reservation:
            old_reservation, = _reservation
            user.cart.remove(old_reservation)
        else:
            user.cart.remove_without_reservation(item)

        new_date_started = json_date_to_python_date(data["startDate"])
        new_date_ended = json_date_to_python_date(data["endDate"])
        rental_range = {
            "date_started": new_date_started,
            "date_ended": new_date_ended
        }
        form_check = validate_rental_bounds(item, rental_range)
        if form_check["is_valid"]:
            rental_data = {
                "renter_id": g.user_id,
                "item_id": item.id,
                "date_started": new_date_started,
                "date_ended": new_date_ended
            }
            reservation, action, waitlist_ad = create_reservation(rental_data)
            if reservation:
                user.cart.add(reservation)
                reservation = reservation.to_dict()
                action = "Your reservation has been updated successfully!"
                code = 201
            else:
                user.cart.add_without_reservation(item)
                flashes.append(waitlist_ad)
            flashes.append(action)
        else:
            user.cart.add_without_reservation(item)
            flashes.append(form_check["message"])
    return {"flashes": flashes}, code

@bp.get("/remove/i/id=<int:item_id>", defaults={"start": None, "end": None})
@bp.get("/remove/i/id=<int:item_id>&start=<start>&end=<end>")
@login_required
def remove_from_cart(item_id, start, end):
    format = "%Y-%m-%d" # this format when taking dates thru url
    g.user_id = session.get('user_id')
    user = Users.get(g.user_id)
    item = Items.get(item_id)
    flashes = []
    if start and end:
        reservation_keys = {
            "renter_id": g.user_id,
            "item_id": item_id,
            "date_started": datetime.strptime(start, format).date(),
            "date_ended": datetime.strptime(end, format).date(),
        }
        reservation = Reservations.get(reservation_keys)
        user.cart.remove(reservation)
    elif start is None and end is None:
        user.cart.remove_without_reservation(item)
    session["cart_size"] = user.cart.size()
    flashes.append(f"The {item.name} has been removed from your cart.")
    return {"flashes": flashes}, 201

@bp.get("/checkout")
@login_required
def checkout():
    photo_url = AWS.get_url("items")
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    items = [] #for json
    is_ready = user.cart.size() > 0
    ready_to_order_items = user.cart.get_reserved_contents()
    for item in user.cart.contents:
        if is_item_in_itemlist(item, ready_to_order_items):
            reservation, = Reservations.filter({
                "renter_id": g.user_id,
                "item_id": item.id,
                "is_in_cart": True
            })
            #FUNC: has someone ordered the item since you've added it to cart?
            if item.calendar.scheduler(reservation) == False:
                user.cart.remove(reservation)
                user.cart.add_without_reservation(item)
            elif not reservation.is_calendared:
                if item.calendar.scheduler(reservation) is None:
                    Items.set(item.id, {"is_available": False})
                    user.cart.remove(reservation)
                elif item.calendar.scheduler(reservation):
                    item_to_dict = item.to_dict()
                    item_to_dict["reservation"] = reservation.to_dict()
        else:
            is_ready = False
            item_to_dict = item.to_dict()
            item_to_dict["reservation"] = ''
        item_to_dict["details"] = item.details.to_dict()
        item_to_dict["calendar"] = item.calendar.to_dict()
        next_start, next_end = item.calendar.next_availability()
        item_to_dict["calendar"]["next_available_start"] = next_start.strftime("%Y-%m-%d")
        item_to_dict["calendar"]["next_available_end"] = next_end.strftime("%Y-%m-%d")
        items.append(item_to_dict)
    return {
        "is_ready": is_ready,
        "photo_url": photo_url,
        "user": user.to_dict(),
        "cart": user.cart.to_dict(),
        "items": items
    }

@bp.post("/checkout/submit")
@login_required
def checkout_submit():
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    flashes = []
    data = request.json
    if data:
        payment_method = data["paymentMethod"]
        token = create_rental_token(g.user_id, user.cart._total)
        return {"token": token}, 201
    else:
        flashes.append("Please select a payment method.")
        return {"flashes": flashes}, 406
