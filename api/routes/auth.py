from datetime import datetime, timedelta
from flask import Blueprint, flash, redirect, render_template, session, g, request
from werkzeug.security import check_password_hash, generate_password_hash

from blubber_orm import Users

from api.tools.settings import login_required, login_user, recaptcha
from api.tools.build import validate_registration, validate_login
from api.tools.build import create_user

bp = Blueprint('auth', __name__)

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = Users.get(user_id)

@bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == "POST":
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        hashed_pass = generate_password_hash(request.form.get("password")) #confirm on the frontend
        form_data = {
            "user": {
                "name": f"{first_name},{last_name}",
                "email": request.form.get("email").lower(),
                "payment": request.form.get("payment"),
                "password": hashed_pass,
                "address_num": request.form.get("num"),
                "address_street": request.form.get("street"),
                "address_apt": request.form.get("apt"),
                "address_zip": request.form.get("zip")
            },
            "profile": {
                "phone": request.form.get("phone"),
                "bio": "I love Hubbub!",
                "id": None
            },
            "cart": {
                "total": 0.0,
                "total_deposit": 0.0,
                "id": None
            },
            "address": {
                "num": request.form.get("num"),
                "street": request.form.get("street"),
                "apt": request.form.get("apt"),
                "city": request.form.get("city"),
                "state": request.form.get("state"),
                "zip": request.form.get("zip")
            }
        }
        if recaptcha.verify():
            form_check = validate_registration(form_data)
            if form_check["is_valid"]:
                new_user = create_user(form_data)
                #TODO: welcome email here
                flash(form_check["message"])
                return redirect('/login')
            else:
                flash(form_check["message"])
        else:
            flash("Sorry, you didn't pass the recaptcha.")
            return redirect("/register")
    return render_template('auth/register.html') #NOTE: just use plain html here

@bp.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        form_data = {
            "email": request.form.get("email").lower(),
            "password": request.form.get("password")
        }
        form_check = validate_login(form_data)
        if form_check["is_valid"]:
            user, = Users.filter({"email": form_data["email"]})
            login_response = login_user(user)
            if login_response["is_valid"]:
                flash(login_response["message"])
                return redirect("/")
            else:
                flash(login_response["message"])
                return redirect("/login")
        else:
            flash(form_check["message"])
            return redirect("/login")
    return render_template("auth/login.html") #NOTE: just use plain html here

@bp.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect("/login")

#TODO: rebuild account recovery
