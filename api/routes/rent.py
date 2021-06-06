from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders
from blubber_orm import Items, Tags, Details, Calendars

from api.tools.settings import create_rental_token
from api.tools.settings import login_required, AWS
from api.tools.build import create_reservation, validate_rental_bounds
from api.tools import blubber_instances_to_dict, json_date_to_python_date

bp = Blueprint('rent', __name__)

@bp.get("/inventory", defaults={"search": None})
@bp.get("/inventory/search=<search>")
def inventory(search):
    listers = Users.get_all() #TODO: only get listers
    photo_url = AWS.get_url("items")
    if search:
        listings = search_items(search)
        print("search", search)
    else:
        listings = Items.filter({"is_available": True})
    return {
        "items": blubber_instances_to_dict(listings),
        "listers": blubber_instances_to_dict(listers),
        "photo_url": photo_url
        }

@bp.route("/inventory/<category>", methods=["POST", "GET"])
def categories(category):
    tag = Tags.get(category)
    photo_url = AWS.get_url("items")
    if tag:
        all_items_with_tag = set(Items.by_tag(tag))
        all_available_items = set(Items.filter({"is_available": True}))
        listings = list(all_available_items.intersection(all_items_with_tag))
    return {
        "listings": blubber_instances_to_dict(listings),
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

@bp.post("/inventory/i/validate/id=<int:item_id>")
@login_required
def validate_rental(item_id):
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
            print("cart", user.cart.contents)
            user.cart.add_without_reservation(item)
            message = "The item has been added to your cart!"
    return {"flashes": [message]}, 201

#TODO: in the new version of the backend, user must propose new dates to reset
#takes data from changed reservation by deleting the temporary res created previously
@bp.route("/update/i/id=<int:item_id>", methods=["POST", "GET"])
@login_required
def update(item_id):
    if request.method == "POST":
        format = "%m/%d/%Y"
        item = Items.get(item_id)
        #NOTE: filter always returns a list but should only have 1 item this time
        _reservation = Reservations.filter({
            "item_id": item_id,
            "renter_id": g.user.id,
            "is_in_cart": True
        })
        if _reservation:
            reservation, = _reservation
            g.user.cart.remove(reservation)
        else:
            g.user.cart.remove_without_reservation(item)

        rental_range = {
            "date_started": request.form.get("start"),
            "date_ended": request.form.get("end")
        }
        form_check = validate_rental_bounds(item, rental_range, format) # start < end on frontend
        if form_check["is_valid"]:
            rental_data = {
                "renter_id": g.user.id,
                "item_id": item.id,
                "date_started": datetime.strptime(rental_range["date_started"], format).date(),
                "date_ended": datetime.strptime(rental_range["date_ended"], format).date()
            }
            reservation, action, waitlist_ad = create_reservation(insert_data)
            if reservation:
                g.user.cart.add(reservation)
                reservation = reservation.to_dict()
                action = "Your reservation has been updated successfully!"
            else:
                g.user.cart.add_without_reservation(item)
                flash(Markup(waitlist_ad))
            flash(action)
        else:
            g.user.cart.add_without_reservation(item)
            flash(form_check["message"])
    return redirect("/checkout")

@bp.route("/remove/i/id=<int:item_id>", defaults={"start": None, "end": None})
@bp.route("/remove/i/id=<int:item_id>&start=<start>&end=<end>")
@login_required
def remove_from_cart(item_id, start, end):
    format = "%Y-%m-%d" # this format when taking dates thru url
    item = Items.get(item_id)
    if start and end:
        reservation_keys = {
            "renter_id": g.user.id,
            "item_id": item_id,
            "date_started": datetime.strptime(start, format).date(),
            "date_ended": datetime.strptime(end, format).date(),
        }
        reservation = Reservations.get(reservation_keys)
        g.user.cart.remove(reservation)
    else:
        g.user.cart.remove_without_reservation(item)
    flash(f"The {item.name} has been removed from your cart.")
    return redirect("/checkout")

@bp.route("/checkout", methods=["POST", "GET"])
@login_required
def checkout():
    reservations = [] #for json
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)
    photo_url = AWS.get_url("items")
    ready_to_order_items = user.cart.get_reserved_contents()
    for item in user.cart.contents:
        if item in ready_to_order_items:
            reservation, = Reservations.filter({
                "renter_id": g.user.id,
                "item_id": item.id,
                "is_in_cart": True
            })
            #as in, some1 hasnt bought it before you checked out
            if item.calendar.scheduler(reservation) == False:
                g.user.cart.remove(reservation)
                g.user.cart.add_without_reservation(item)
            elif not reservation.is_calendared:
                if item.calendar.scheduler(reservation) is None:
                    Items.set(item.id, {"is_available": False})
                    g.user.cart.remove(reservation)
                    flash(f"Unfortunately, the {item.name} is no longer available.")
                elif item.calendar.scheduler(reservation):
                    reservations.append(reservation)

    if ready_to_order_items == g.user.cart.contents:
        if request.method == "POST":
            payment_method = request.form.get("payment_method")
            rental_token = create_rental_token(g.user.id, g.user.cart._total)
            if payment_method:
                return redirect(f"/checkout/router&token={rental_token}&method={payment_method}")
            else:
                flash("Please select a payment method.")
    return {
        "photo_url": photo_url,
        "user": g.user.to_dict(),
        "cart": g.user.cart.to_dict(),
        "reservations": blubber_instances_to_dict(reservations),
        "items": blubber_instances_to_dict(g.user.cart.contents)
        }
