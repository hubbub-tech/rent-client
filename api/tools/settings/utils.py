import functools
from flask import session, redirect, flash, g

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            flash('Login to view this page.')
            return redirect("/login")
        return view(**kwargs)
    return wrapped_view

#done
def login_user(user):
    is_valid = True
    message = None
    if user.is_blocked == False:
        try:
            session.clear()
            session["user_id"] = user.id
            message = "Successful login. Welcome back!"
        except:
            is_valid = False
            message = "ERROR - A04. Contact admins at hubbubcu@gmail.com."
    else:
        is_valid = False
        message = "The admin has decided to block your account. Contact hubbubcu@gmail.com for more info."

    Users.set(user.id, {"dt_last_active": datetime.now()})
    return {
        "is_valid" : is_valid,
        "message" : message}
