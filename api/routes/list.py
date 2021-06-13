from flask import Blueprint, flash, g, redirect, render_template, request, session

from blubber_orm import Users, Tags

from api.tools.settings import login_required
from api.tools.build import validate_listing
from api.tools import blubber_instances_to_dict, json_date_to_python_date

bp = Blueprint('list', __name__)

@bp.get('/list')
@login_required
def list():
    tags = Tags.get_all() #TODO: only get top 8 category tags
    g.user_id = session.get("user_id")
    user = Users.get(g.user_id)

    return {
        "tags": blubber_instances_to_dict(tags),
        "address": user.address.to_dict()
    }


@bp.post('/list/submit')
@login_required
def list_submit():
    format = "%Y-%m-%d"
    flashes = []
    data = request.json
    if data:
        new_date_started = json_date_to_python_date(data["startDate"])
        new_date_ended = json_date_to_python_date(data["endDate"])
        form_data = {
            "item": {
                "lister_id": g.user_id,
                "name": data["name"],
                "price": data["price"],
                "address_num": data["num"],
                "address_street": data["street"],
                "address_apt": data["apt"],
                "address_zip": data["zip"]
            },
            "details": {
                "description": data["description"],
                "condition": data["condition"],
                "volume": data["volume"],
                "weight": data["weight"],
                "id": None
            },
            "calendar": {
                "date_started": new_date_started,
                "date_ended": new_date_ended,
                "id": None
            },
            "address": {
                "num": data["num"],
                "street": data["street"],
                "apt": data["apt"],
                "city": data["city"],
                "state": data["state"],
                "zip": data["zip"]
            },
            "tags": data["selectedTags"],
            "is_listed_from_user_address": data["isDefaultAddress"]
        }
        image = data["image"]
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
                flashes.append(form_check["message"])
                return {"flashes": flashes}, 201
            else:
                flashes.append(upload_response["message"])
                return {"flashes": flashes}, 406
        else:
            flashes.append(form_check["message"])
            return {"flashes": flashes}, 406
    else:
        flashes.append("No data was sent.")
        return {"flashes": flashes}, 406

#TODO: create static page for list/info
#TODO: create static page for list/complete or list/success
