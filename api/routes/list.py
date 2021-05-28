from flask import Blueprint, flash, g, redirect, render_template, request, session

from blubber_orm import Users, Tags

from api.tools.settings import login_required
from api.tools.build import validate_listing
from api.tools import blubber_instances_to_dict

bp = Blueprint('list', __name__)

@bp.route('/list', methods=['POST', 'GET'])
@login_required
def list():
    format = "%m/%d/%Y"
    tags = Tags.get_all() #TODO: only get top 8 category tags
    if request.method == "POST":
        form_data = {
            "item": {
                "lister_id": g.user.id,
                "name": request.form.get("name"),
                "price": request.form.get("price"),
                "address_num": request.form.get("num"),
                "address_street": request.form.get("street"),
                "address_apt": request.form.get("apt"),
                "address_zip": request.form.get("zip")
            },
            "details": {
                "description": request.form.get("description"),
                "condition": request.form.get("condition"),
                "volume": request.form.get("volume"),
                "weight": request.form.get("weight"),
                "id": None
            },
            "calendar": {
                "date_started": request.form.get("start"),
                "date_ended": request.form.get("end"),
                "id": None
            },
            "address": {
                "num": request.form.get("num"),
                "street": request.form.get("street"),
                "apt": request.form.get("apt"),
                "city": request.form.get("city"),
                "state": request.form.get("state"),
                "zip": request.form.get("zip")
            },
            "tags": request.form.getlist("tags"),
            "is_listed_from_user_address": request.form.get("use_my_address")
        }
        image = request.files.get("image")
        form_check = validate_listing(form_data, format) #validate `start` < `end` on frontend
        if form_check["is_valid"]:
            date_started_str = form_data["calendar"]["date_started"]
            date_ended_str = form_data["calendar"]["date_ended"]
            form_data["calendar"]["date_started"] = datetime.strptime(date_started_str, format).date()
            form_data["calendar"]["date_ended"] = datetime.strptime(date_ended_str, format).date()

            item = create_item(form_data)
            image_data = {
                "self": item,
                "image" : image,
                "directory" : "items",
                "bucket" : AWS.S3_BUCKET
            }
            upload_response = upload_image(image_data)
            if upload_response["is_valid"]:
                #TODO: send lister confirmation email
                flash(form_check["message"])
                return redirect('/list/success')
            else:
                flash(upload_response["message"])
                return redirect("/")
        else:
            flash(form_check["message"])
            return redirect("/become-a-lister")
    return {"tags": blubber_instances_to_dict(tags)}

#TODO: create static page for list/info
#TODO: create static page for list/complete or list/success
