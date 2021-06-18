from datetime import datetime, timedelta
from flask import Blueprint, flash, redirect, get_flashed_messages, session, g, request
from werkzeug.security import check_password_hash, generate_password_hash

from blubber_orm import Users

from api.tools.settings import login_required, login_user, recaptcha
from api.tools.build import validate_registration, validate_login
from api.tools.build import create_user

bp = Blueprint('auth', __name__)

@bp.before_app_request
def load_logged_in_user():
    g.user_id = session.get('user_id', None)

@bp.get('/login_status')
def login_status():
    g.user_id = session.get('user_id', None)
    return {
        "flashes": get_flashed_messages(),
        "user_id": g.user_id,

    }

@bp.get('/cart_size')
def cart_size():
    cart_size = session.get('cart_size', None)
    return {"cart_size": cart_size}


@bp.post('/login')
def login():
    flashes = []
    errors = []
    data = request.json
    if data:
        form_data = {
            "email": data["user"]["email"],
            "password": data["user"]["password"]
        }
        form_check = validate_login(form_data)
        if form_check["is_valid"]:
            user, = Users.filter({"email": form_data["email"]})
            login_response = login_user(user)
            if login_response["is_valid"]:
                flashes.append(login_response["message"])
                return {
                    "is_logged_in": True,
                    "errors": errors,
                    "flashes": flashes
                }, 201
            else:
                errors.append(login_response["message"])
                flashes.append("Houston, we have a problem...")
        else:
            errors.append(form_check["message"])
            flashes.append("Houston, we have a problem...")
    else:
        flashes.append("Nothing was entered! We need input to log you in.")
    return {
        "is_logged_in": False,
        "errors": errors,
        "flashes": flashes
    }, 406 #NOTE: no data

@bp.post('/register')
def register():
    flashes = []
    errors = []
    data = request.json
    if data:
        first_name = data["user"]["firstName"]
        last_name = data["user"]["lastName"]
        unhashed_pass = data["user"]["password"] #TODO: confirm on the frontend
        hashed_pass = generate_password_hash(unhashed_pass)
        form_data = {
            "user": {
                "name": f"{first_name},{last_name}",
                "email": data["user"]["email"],
                "payment": data["user"]["payment"],
                "password": hashed_pass,
                "address_num": data["address"]["num"],
                "address_street": data["address"]["street"],
                "address_apt": data["address"]["apt"],
                "address_zip": data["address"]["zip"]
            },
            "profile": {
                "phone": data["profile"]["phone"],
                "bio": "I love Hubbub!",
                "id": None
            },
            "cart": {
                "total": 0.0,
                "total_deposit": 0.0,
                "id": None
            },
            "address": {
                "num": data["address"]["num"],
                "street": data["address"]["street"],
                "apt": data["address"]["apt"],
                "city": data["address"]["city"],
                "state": data["address"]["state"],
                "zip": data["address"]["zip"]
            }
        }
        #if recaptcha.verify():
        form_check = validate_registration(form_data["user"])
        if form_check["is_valid"]:
            new_user = create_user(form_data)
            #TODO: welcome email here
            flashes.append(form_check["message"])
            return {"flashes": flashes}, 201
        else:
            errors.append(form_check["message"])
            flashes.append("Uh oh...")
    else:
        errors.append("No information to create an account!")
        flashes.append("Uh oh...")
    return {
        "flashes": flashes,
        "errors": errors
    }, 406

@bp.get("/logout")
@login_required
def logout():
    session.clear()
    return {"is_logged_in": False}

#TODO: rebuild account recovery
