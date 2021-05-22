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

def create_reservation(insert_data):
    item = Items.get(insert_data["item_id"])
    rental_duration = (insert_data["date_ended"] - insert_data["date_started"]).days
    insert_data["charge"] = exp_decay(item.price, rental_duration)
    insert_data["deposit"] = insert_data["charge"] * 0.25

    reservation = Reservations.insert(insert_data)

    #scheduler() checks if the res conflicts with other reservations
    is_valid_reservation = item.calendar.scheduler(reservation)
    if is_valid_reservation == True:
        action_message = "Great, the item is available! If it's not in your cart already make sure you 'Add to Cart'!"
        waitlist_message = None
    else:
        #TODO: maybe delete the reservation if it isnt schedulable?
        #tells users when an item is available if the res conflicts
        reservation = None
        first_sentence = "The time you entered is already booked."
        action_message, waitlist_message = generate_proposed_period(item, first_sentence)

    return reservation, action_message, waitlist_message

def create_order(order_data):
    renter = order_data["renter"]
    item = order_data["item"]
    temp = order_data["temp"]
    new_order = Orders(
        date=datetime.now(),
        renter_id=renter.id,
        renter_name=renter.get_name(),
        renter_email=renter.email,
        renter_phone=renter.profile.phone,
        renter_location=renter.location,
        renter_payment=renter.payment,

        lister_id=item.lister.id,
        lister_name=item.lister.get_name(),
        lister_email=item.lister.email,
        lister_phone=item.lister.profile.phone,
        lister_location=item.lister.location,
        lister_payment=item.lister.payment,

        item_id=item.id,
        item_name=item.name,
        item_reservation_start=temp.reservation.start,
        item_reservation_end=temp.reservation.end,
        item_price=temp.temp_price
        )
    db.session.add(new_order)
    db.session.commit()
    return new_order

def create_testimonial(testimonial_data):
    new_testimonial = Testimonial(
        name=testimonial_data["name"],
        location=testimonial_data["location"],
        description=testimonial_data["description"]
        )
    db.session.add(new_testimonial)
    db.session.commit()
    return new_testimonial

def create_tag(tag_name):
    new_tag = Tag(tag_name=tag_name.lower())
    db.session.add(new_tag)
    db.session.commit()
    return new_tag

def create_review(review_data):
    new_review = Reviews.insert(review_data)
    return new_review

def create_admin(admin_data):
    new_admin = Admin(
        key_one=generate_password_hash(admin_data["one"]),
        key_two=generate_password_hash(admin_data["two"]),
        absolute=generate_password_hash(admin_data["absolute"])
        )
    db.session.add(new_admin)
    db.session.commit()
    return new_admin

def create_logistics(logistics_data):
    new_logistics = Logistics(
        notes=logistics_data["notes"],
        referral=logistics_data.get("referral", None),
        location=logistics_data["location"],
        dropoff_date=logistics_data.get("dropoff_date", None),
        pickup_date=logistics_data.get("pickup_date", None),
        timeslots=logistics_data["timeslots"],
        renter_id=logistics_data["renter_id"]
        )
    db.session.add(new_logistics)
    db.session.commit()
    return new_logistics
