import boto3
from botocore.exceptions import NoCredentialsError
from werkzeug.security import check_password_hash, generate_password_hash
from blubber_orm import Users

def is_valid_date(date_str, format_key):
    is_valid = False
    message = None
    valid_date = None
    format = None
    try:
        valid_date = datetime.strptime(date_str, format_key).date()
    except:
        format_humanized = {
            "%Y-%m-%d" : "YYYY-MM-DD",
            "%m/%d/%Y" : "MM/DD/YYYY",
            "%B %-d, %Y" : "Month D, YYYY"
        }
        if format_key in format_humanized.keys():
            format = format_humanized[format_key]
        else:
            format = format_key
        message = f"Date is not valid. Please adhere to this format: {format}"
    else:
        is_valid = True
        message = "This date is valid."
    return {
        "is_valid" : is_valid,
        "message" : message,
        "valid_date" : valid_date
        }

#done 5/21
def validate_edit_account(form_data):
    is_valid = False
    message = None

    check_if_is_existing_user = Users.filter({"email": form_data["email"]})
    if check_if_is_existing_user:
        registered_email_owner, = check_if_is_existing_user
        if registered_email_owner != form_data["self"]
            message = "Sorry, the email you want to user is already in use."
    else:
        is_valid = True
    return {
        "is_valid" : is_valid,
        "message" : message
        }

def validate_edit_password(form_data):
    is_valid = False
    _self = form_data["self"]
    if not check_password_hash(_self.password, form_data["current_password"]):
        message = "The password you entered is incorrect."
    else:
        message = "Successful login. Welcome back!"
    return {
        "is_valid" : is_valid,
        "message" : message
        }

#done 5/21
def upload_image(image_data):
    is_valid = False

    image = image_data["image"]
    _self = image_data["self"]
    dir = image_data["directory"]
    bucket = image_data["bucket"]

    path = f"{dir}/{_self.id}.jpg"
    s3_resource = boto3.resource("s3")
    try:
        s3_resource.Bucket(bucket).put_object(Key=path, Body=image, ACL='public-read')
    except FileNotFoundError:
        #logging here
        message = "The file was not found by the cloud. Contact admins at hubbubcu@gmail.com for help."
    except NoCredentialsError:
        #logging here
        message = "Credentials not available. Contact admins at hubbubcu@gmail.com for help."
    else:
        is_valid = True
        message = "Photo was successfully saved!"
    return {
        "is_valid" : is_valid,
        "message" : message
        }

#done
def validate_period(start, end, format):
    is_valid = False
    message = None
    start_date = is_valid_date(start, format)
    end_date = is_valid_date(end, format)
    if start_date["is_valid"] and end_date["is_valid"]:
        if start_date["valid_date"] < end_date["valid_date"]:
            is_valid = True
            message = "Valid date range."
        else:
            message = "Your end date must be set after your start date."
    else:
        if start_date["is_valid"]:
            message = "End {}".format(end_date["message"])
        elif end_date["is_valid"]:
            message = "Start {}".format(start_date["message"])
        else:
            message = "[Both Start and End] {}".format(start_date["message"])
    return {
        "is_valid" : is_valid,
        "message" : message}

#done
def validate_registration(form_data):
    is_valid = False
    message = None
    loaded_user = Users.filter({"email": form_data["email"].lower()})
    if loaded_user is None:
        if form_data["password"] != form_data["confirm"]:
            message = "Your password and cofirm do not match."
        elif '@' not in form_data["payment"]:
            message = "Please include @ in your venmo."
        else:
            is_valid = True
            message = "You're registered on Hubbub, now login to get started!"
    else:
        message = "You might already have an account. Try logging in!"
    return {
        "is_valid" : is_valid,
        "message" : message}

#done
def validate_login(form_data):
    is_valid = False
    message = None
    loaded_user = Users.filter({"email": form_data["email"].lower()})
    if loaded_user:
        if not check_password_hash(loaded_user.password, form_data["password"]):
            message = "Sorry, invalid password and email combination."
        else:
            is_valid = True
            message = "You logged in, welcome back!"
    else:
        message = "Sorry, invalid password and email combination."
    return {
        "is_valid" : is_valid,
        "message" : message}

#done
def validate_listing(form_data, format):
    is_valid = False
    message = None
    start = form_data["date_started"]
    end = form_data["date_ended"]

    is_validated = validate_period(start, end, format)
    if is_validated["is_valid"]:
        is_valid = True
        message = "Successful listing! Go to the Rent Page to check it out!"
    else:
        message = is_validated["message"]
    return {
        "is_valid" : is_valid,
        "message" : message}

#done
def validate_rental(item, rental_range, format):
    is_valid = False
    message = None
    max_rental_period = 365

    start_date = is_valid_date(rental_range["date_started"], format)
    end_date = is_valid_date(rental_range["date_ended"], format)

    is_validated = validate_period(rental_range, format)
    if is_validated["is_valid"]:
        if date.today() + timedelta(days=4) >= item.calendar.date_ended:
            Items.set(item.id, {"is_available": False})
            message = "Sorry, the item is not currently available."

        elif start_date["valid_date"] < item.calendar.start_listing:
            message = "The item is unavailable for the period you requested." + \
                " The item is listed starting {} to {}.".format(
                    item.calendar.date_started.strftime("%B %-d, %Y"),
                    item.calendar.date_ended.strftime("%B %-d, %Y")
                    )
        elif end_date["valid_date"] > item.calendar.end_listing:
            message = "The item is unavailable for the period you requested." + \
                " The item is listed starting {} to {}.".format(
                    item.calendar.date_started.strftime("%B %-d, %Y"),
                    item.calendar.date_ended.strftime("%B %-d, %Y")
                    )
        elif start_date["valid_date"] < date.today() + timedelta(days=2):
            message = "The earliest your rental can start is two days from today."
        elif (end_date["valid_date"] - start_date["valid_date"]).days > max_rental_period:
            message = "Rentals cannot exceed {} days.".format(max_rental_period)
        else:
            is_valid = True
            message = "Period is within calendar bounds."
    else:
        message = is_validated["message"]
    return {
        "is_valid" : is_valid,
        "message" : message
        }

def validate_admin(form_data):
    is_valid = False
    message = None
    admin_object = Admin.query.get_or_404(1)
    #super admin key
    if form_data["one"] == form_data["two"]:
        if check_password_hash(admin_object.absolute, form_data["one"]):
            is_valid = True
            message = "You have been authorized. Welcome."
        else:
            message = "Admin keys are incorrect. Try again."
    else:
        #or check keys
        if not check_password_hash(admin_object.key_one, form_data["one"]):
            message = "Admin keys are incorrect. Try again."
        elif not check_password_hash(admin_object.key_two, form_data["two"]):
            message = "Admin keys are incorrect. Try again."
        else:
            is_valid = True
            message = "You have been authorized. Welcome."
    return {
        "is_valid" : is_valid,
        "message" : message
        }

def validate_reset_password(form_data):
    is_valid = False
    message = None
    if form_data["new_password"] == form_data["confirm"]:
        is_valid = True
        message = "Thanks for your help! Your new password is set. Go to login to try it out."
    else:
        message = "Your new passwords do not match. Try again."
    return {
        "is_valid" : is_valid,
        "message" : message
        }

def generate_token(unhashed_token):
    hashed_token = generate_password_hash(unhashed_token)
    return hashed_token

def verify_token(hashed_token, unhashed_token):
    is_valid = check_password_hash(hashed_token, unhashed_token)
    return is_valid

def parse_timeslots(availabilities):
    timeslots = []
    for entry in availabilities:
        time_at_date = entry.split("@")
        timeslots.append(time_at_date)
    #sort timeslots by the date. need YYYY-DD-MM to sort
    timeslots.sort(key = lambda entry: entry[-1])
    consolidated_timeslots = {}
    for time, date in timeslots:
        if not date in consolidated_timeslots.keys():
            times = []
        times.append(time)
        consolidated_timeslots[date] = times
    return consolidated_timeslots

def clump_timeslots(timeslots):
    return timeslots
