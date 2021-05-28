from datetime import datetime, date
from blubber_orm import Users, Profiles, Carts
from blubber_orm import Items, Details, Calendars, Tags
from blubber_orm import Addresses, Reservations

from werkzeug.security import check_password_hash, generate_password_hash

from api.tools.settings import exp_decay
#done
def create_user(insert_data):
    user_address = Addresses.filter(insert_data["address"])
    #NOTE: an empty list returns false not none
    if not user_address:
        user_address = Addresses.insert(insert_data["address"])

    new_user = Users.insert(insert_data["user"])

    insert_data["profile"]["id"] = new_user.id
    insert_data["cart"]["id"] = new_user.id

    Profiles.insert(insert_data["profile"])
    Carts.insert(insert_data["cart"])
    return new_user

#done
def create_item(insert_data):
    if not insert_data["is_listed_from_user_address"]:
        item_address = Addresses.insert(insert_data["address"])

    new_item = Items.insert(insert_data["item"])
    #TODO: add tags to item after creation

    insert_data["details"]["id"] = new_item.id
    insert_data["calendar"]["id"] = new_item.id

    Calendars.insert(insert_data["calendar"])
    Details.insert(insert_data["details"])

    for tag_name in insert_data["tags"]:
        tag = Tags.get(tag_name)
        new_item.add_tag(tag)
    return new_item

def create_review(review_data):
    new_review = Reviews.insert(review_data)
    return new_review

def create_reservation(insert_data):
    reservation = Reservations.get(insert_data)
    if reservation is None:
        item = Items.get(insert_data["item_id"])
        rental_duration = (insert_data["date_ended"] - insert_data["date_started"]).days
        insert_data["charge"] = exp_decay(item.price, rental_duration)
        insert_data["deposit"] = insert_data["charge"] * 0.25

        reservation = Reservations.insert(insert_data)

        #scheduler() checks if the res conflicts with other reservations
        is_valid_reservation = item.calendar.scheduler(reservation)
    else:
        is_valid_reservation = True

    if is_valid_reservation:
        action_message = "Great, the item is available! If it's not in your cart already make sure you 'Add to Cart'!"
        waitlist_message = None
    else:
        #TODO: maybe delete the reservation if it isnt schedulable?
        #tells users when an item is available if the res conflicts
        reservation = None
        first_sentence = "The time you entered is already booked."
        action_message, waitlist_message = generate_proposed_period(item, first_sentence)

    return reservation, action_message, waitlist_message
