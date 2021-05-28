from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders
from blubber_orm import Items, Tags

from api.tools.settings import create_rental_token
from api.tools.settings import login_required, AWS
from api.tools.build import create_reservation, validate_rental_bounds
from api.tools import blubber_instances_to_dict

bp = Blueprint('rent', __name__)

@bp.route("/inventory", defaults={"search": None}, methods=["POST", "GET"])
@bp.route("/inventory/search=<search>", methods=["POST", "GET"])
def inventory(search):
    photo_url = AWS.get_url("items")
    if search:
        listings = search_items(search)
    else:
        listings = Items.filter({"is_available": True})

    if request.method == "POST":
        search = request.form.get("search", "all") #if search is None, search='all'
        if search:
            return redirect(f"/inventory/search={search}")
    return {
        "listings": blubber_instances_to_dict(listings),
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

@bp.route("/inventory/i/id=<int:item_id>", methods=["POST", "GET"])
def details(item_id):
    format = "%m/%d/%Y"
    item = Items.get(item_id)
    photo_url = AWS.get_url("items")

    if request.method == "POST":
        rental_range = {
            "date_started" : request.form.get("start"),
            "date_ended" : request.form.get("end")
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
                reservation = reservation.to_dict()
            else:
                flash(Markup(waitlist_ad))
            flash(action)
        else:
            flash(form_check["message"])
    return {
        "reservation": reservation,
        "item": item.to_dict(),
        "photo_url": photo_url,
        "booked_days": item.calendar.get_booked_days(stripped=False)
        }

@bp.route("/add/i/id=<int:item_id>", defaults={"start": None, "end": None})
@bp.route("/add/i/id=<int:item_id>&start=<start>&end=<end>")
@login_required
def add_to_cart(item_id, start, end):
    format = "%Y-%m-%d"
    item = Items.get(item_id)
    if start and end:
        if not item in g.user.cart.contents:
            reservation_keys = {
                "renter_id": g.user.id,
                "item_id": item_id,
                "date_started": datetime.strptime(start, format).date(),
                "date_ended": datetime.strptime(end, format).date()
            }
            reservation = Reservations.get(reservation_keys)
            g.user.cart.add(reservation)
            message = "The item has been added to your cart!"
        else:
            message = "The item is already in your cart."
    else:
        g.user.cart.add_without_reservation(item)
        message = "The item has been added to your cart!"
    flash(message)
    return redirect(f"/inventory/i/id={item_id}")

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
    photo_url = AWS.get_url("items")
    ready_to_order_items = g.user.cart.get_reserved_contents()
    for item in g.user.cart.contents:
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
            elif not reservation in item.calendar.reservations:
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
