from datetime import datetime, date
from blubber_orm import Users, Profiles, Carts
from blubber_orm import Items, Details, Calendars

from werkzeug.security import check_password_hash, generate_password_hash

#done
def create_user(insert_data):
    new_user = Users.insert(insert_data["user"])

    insert_data["profile"]["id"] = new_user.id
    insert_data["cart"]["id"] = new_user.id

    Profiles.insert(insert_data["profile"])
    Carts.insert(insert_data["cart"])

    return new_user

#done
def create_item(insert_data):
    new_item = Items.insert(insert_data["item"])
    #TODO: add tags to item after creation

    insert_data["details"]["id"] = new_item.id
    insert_data["calendar"]["id"] = new_item.id

    Calendars.insert(insert_data["calendar"])
    Details.insert(insert_data["details"])

    return new_item

def create_review(review_data):
    new_review = Reviews.insert(review_data)
    return new_review
