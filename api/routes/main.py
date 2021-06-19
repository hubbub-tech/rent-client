import time
import json
from datetime import datetime, date
from werkzeug.security import generate_password_hash
from flask import Blueprint, redirect, session, g, request, url_for

from blubber_orm import Users, Profiles, Orders
from blubber_orm import Items, Details, Testimonials

from api.tools.build import validate_edit_account, validate_edit_password
from api.tools.settings import login_required, AWS
from api.tools import blubber_instances_to_dict

bp = Blueprint('main', __name__)

@bp.get("/index")
def index():
    _testimonials = Testimonials.get_all()
    testimonials = blubber_instances_to_dict(_testimonials)
    for testimonial in testimonials:
        print(testimonial)
        user = Users.get(testimonial["user_id"])
        testimonial["user"] = user.to_dict()
        testimonial["user"]["name"] = user.name
        testimonial["user"]["city"] = user.address.city
        testimonial["user"]["state"] = user.address.state
    return {"testimonials": testimonials}

#keep track of items being rented, items owned, item reviews and item edits
@bp.route("/accounts/u/id=<int:id>")
@login_required
def account(id):
    searched_user = Users.get(id)
    photo_url = AWS.get_url("users")
    user_to_dict = searched_user.to_dict()
    user_to_dict["name"] = searched_user.name
    user_to_dict["cart"] = searched_user.cart.to_dict()
    user_to_dict["profile"] = searched_user.profile.to_dict()
    listings_obj = Items.filter({"lister_id": searched_user.id})
    listings = []
    for item in listings_obj:
        item_to_dict = item.to_dict()
        next_start, next_end  = item.calendar.next_availability()
        item_to_dict["calendar"] = item.calendar.to_dict()
        item_to_dict["calendar"]["next_available_start"] = next_start.strftime("%Y-%m-%d")
        item_to_dict["calendar"]["next_available_end"] = next_end.strftime("%Y-%m-%d")
        item_to_dict["details"] = item.details.to_dict()
        listings.append(item_to_dict)
    return {
        #is the current user the owner of the account?
        "photo_url": photo_url,
        "user": user_to_dict,
        "listings": listings
    }

#edit personal account
@bp.route("/accounts/u/edit", methods=["POST", "GET"])
@login_required
def edit_account():
    photo_url = AWS.get_url("users")

    if request.method == "POST":
        form_data = {
            "self": g.user,
            "payment": request.form.get("payment", g.user.payment),
            "email": request.form.get("email", g.user.email),
            "phone": request.form.get("phone", g.user.profile.phone),
            "bio": request.form.get("bio", g.user.profile.bio)
        }
        form_check = validate_edit_account(form_data)
        if form_check["is_valid"]:
            Users.set(g.user.id, {
                "bio": form_data["bio"],
                "email": form_data["email"],
                "phone": form_data["phone"],
                "payment": form_data["payment"],
            })

            image = request.files.get("image")
            if image:
                image_data = {
                    "self": g.user,
                    "image" : image,
                    "directory" : "users",
                    "bucket" : AWS.S3_BUCKET
                }
                upload_response = upload_image(image_data)
                if upload_response["is_valid"]:
                    Profiles.set(g.user.id, {"has_pic": True})
                flash(upload_response["message"])
            flash(upload_response["message"])
            return redirect(f"/accounts/u/id={g.user.id}")
        else:
            flash(upload_response["message"])
            return redirect("/accounts/u/edit")
    return {
        "user": g.user.to_dict(),
        "photo_url": photo_url
        }

#edit personal password
#check that the confirmation pass and new pass match on frontend
@bp.route("/accounts/u/password", methods=["POST", "GET"])
@login_required
def edit_password():
    if request.method == "POST":
        form_data = {
            "self" : g.user,
            "current_password" : request.form.get("current"),
            "new_password" : request.form.get("new")
        }
        form_check = validate_edit_password(form_data)
        if form_check["is_valid"]:
            g.user.password = generate_password_hash(form_data["new_password"])
            return redirect(f"/accounts/u/id={g.user.id}")
        else:
            flash(form_check["message"])
            return redirect("/accounts/u/password")
    return {"user": g.user.to_dict()}

#remove user profile picture
@bp.route("/accounts/u/remove-picture")
@login_required
def remove_pic():
    Profiles.set(g.user.id, {"has_pic": False})
    return redirect(f"/accounts/u/id={g.user.id}")

#users hide items
@bp.route("/accounts/i/hide/id=<int:item_id>&status=<int:toggle>")
@login_required
def hide_item(item_id, toggle):
    item_to_hide = Items.get(item_id)
    #TODO: permissioned access based on ownership or admin access
    boolean_conversion = {0: True, 1: False}
    item_to_hide.is_available = boolean_conversion[toggle]
    if boolean_conversion[toggle]:
        flash("Item has been hidden. Come back when you are ready to reveal it.")
    else:
        flash("Item has been revealed. Others can now see it in inventory.")
        return redirect(f"/accounts/u/id={g.user.id}")

#user edit items
@bp.route("/accounts/i/edit/id=<int:item_id>", methods=["POST", "GET"])
@login_required
def edit_item(item_id):
    format = "%m/%d/%Y"
    photo_url = AWS.get_url("items")
    item = Items.get(item_id)
    #TODO: permission based on admin access and ownership
    if request.method == "POST":
        form_data = {
            "price": request.form.get("price", item.price),
            "description": request.form.get("description", item.details.description),
            "extend": request.form.get("extend") #TODO: check date format in frontend
        }
        new_end_of_calendar = datetime.strptime(form_data["extend"], format).date()

        Items.set(item_id, {"price": form_data["price"]})
        Details.set(item_id, {"description": form_data["description"]})
        Calendars.set(item_id, {"date_ended": new_end_of_calendar})
        image = request.files.get("image")
        if image:
            image_data = {
                "self" : item,
                "image" : image,
                "directory" : "items",
                "bucket" : AWS.S3_BUCKET
            }
            upload_response = upload_image(image_data)
            flash(upload_response["message"])
        flash(f"Your {item.name} has been updated!")
        return redirect(f"/accounts/u/id={g.user.id}")
    return {
        "item": item.to_dict(),
        "photo_url": photo_url
        }

#review an item
@bp.route("/accounts/i/review/id=<int:item_id>", methods=["POST", "GET"])
@login_required
def review_item(item_id):
    photo_url = AWS.get_url("items")
    item = Items.get(item_id)
    if item.lister_id != g.user.id:
        if request.method == "POST":
            form_data = {
                "item_id": item.id,
                "author_id": g.user.id,
                "body": request.form.get("body"),
                "rating": request.form.get("rating")
            }
            new_review = create_review(form_data)
            flash(f"The {item.name} that you rented has been reviewed.")
            return redirect(f"/accounts/u/id={g.user.id}")
        return {
            "item": item.to_dict(),
            "photo_url": photo_url
            }
    else:
        flash("You cannot review your own item.")
        return redirect(f"/accounts/u/id={g.user.id}")
