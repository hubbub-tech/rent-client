import boto3
from botocore.exceptions import NoCredentialsError
from werkzeug.security import check_password_hash, generate_password_hash
from blubber_orm import Users

#done 5/21
def validate_edit_account(form_data):
    is_valid = False
    message = None

    check_if_is_existing_user = Users.filter({"email": form_data["email"]})
    if check_if_is_existing_user:
        registered_email_owner, = check_if_is_existing_user
        if registered_email_owner != form_data["self"]:
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
