from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders
from blubber_orm import Items, Tags

from api.tools.settings import login_required, AWS
from api.tools.build import validate_rental_bounds
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

@bp.route("/inventory/item=<int:item_id>", methods=["POST", "GET"])
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
