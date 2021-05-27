import pytz
import functools
from datetime import datetime
from flask import session, redirect, flash, g
from blubber_orm import Users

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            flash('Login to view this page.')
            return redirect("/login")
        return view(**kwargs)
    return wrapped_view

def login_user(user):
    is_valid = True
    if user.is_blocked:
        is_valid = False
        message = "The admin has decided to block your account. Contact hubbubcu@gmail.com for more info."
    else:
        session.clear()
        session["user_id"] = user.id
        message = "You're logged in, welcome back!"
    Users.set(user.id, {"dt_last_active": datetime.now(tz=pytz.UTC)})
    return {
        "is_valid" : is_valid,
        "message" : message
        }
