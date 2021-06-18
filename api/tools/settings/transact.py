import pytz
from math import log, exp
from datetime import datetime, date, timedelta
from werkzeug.security import check_password_hash, generate_password_hash

from blubber_orm import Reservations, Items, Orders, Users

#from api import make_celery, create_app

#@celery.task
def set_async_timeout(user_id):
    # """Background task to unlock items if user does not transact."""
    # try:
    #     async_app = create_app()
    #     with async_app.app_context():
    #         user = Users.get(user_id)
    #         for item in user.cart.contents:
    #             item.unlock()
    #     print(f"All items in {user.name}'s cart have been unlocked again.") # TODO: log this
    #     return True
    # except:
    #     #TODO: write a proper exception handling statement here
    #     print("The timeout failed.")
    #     return False
    pass

def exp_decay(retail_price, time_now, discount=.50, time_total=28):
    #Where discount is issued at time_total
    base_price = retail_price / 10
    if time_now > 180:
        time_total = 56
    compound = retail_price / 90
    a = compound * 10 ** (-log((1 - discount), 10) / (time_total - 1))
    r = 1 - (compound / a)
    y = a * (1 - r) ** time_now #per_day_price_now
    #calculate the cost of the rental to the user
    integ_time = (a * (1 - r) ** time_now) / log(1 - r)
    integ_0 = a * (1 - r) / log(1 - r)
    cost_to_date = base_price + integ_time - integ_0
    if cost_to_date < base_price:
        return base_price
    return cost_to_date

def create_rental_token(shopper_id, cost):
    unhashed_token = f"hubbubble-{shopper_id}-{cost}"
    hashed_token = generate_password_hash(unhashed_token)
    return hashed_token

def verify_rental_token(hashed_token, shopper_id, cost):
    unhashed_token = f"hubbubble-{shopper_id}-{cost}"
    is_valid = check_password_hash(hashed_token, unhashed_token)
    return is_valid

def unlock_checkout(user, specified_items=None):
    if specified_items:
        for item in specified_items:
            item.unlock()
    else:
        for item in user.cart.contents:
            item.unlock()

def lock_checkout(user):
    locked_items = []
    #check that reservations don't overlap and that item is unlocked
    for item in user.cart.contents:
        _reservation = Reservations.filter({
            "item_id": item.id,
            "renter_id": user.id,
            "is_in_cart": True
        })
        if _reservation:
            reservation, = _reservation
            if item.calendar.scheduler(reservation) and item.is_locked == False:
                item.lock(user)
                locked_items.append(item)
            else:
                unlock_checkout(user, specified_items=locked_items)
                return {
                    "is_valid" : False,
                    "message" : "Seems like someone got to an item before you. Check your rental periods."
                    }
        else:
            unlock_checkout(user, specified_items=locked_items)
            return {
                "is_valid" : False,
                "message" : "Not all of your items had reservations set for checkout."
                }
    # timeout_clock = datetime.now(tz=pytz.UTC) + timedelta(minutes=30)
    # set_async_timeout.apply_async(eta=timeout_clock, kwargs={"user_id": user.id})
    return {
        "is_valid" : True,
        "message" : "All items in cart have been locked successfully."
        }

def check_if_routed(user):
    routed_items = []
    for item in user.cart.contents:
        if item.is_locked and item.last_locked == user.id:
            if item.is_routed:
                routed_items.append(item)
            else:
                unlock_checkout(user, specified_items=routed_items)
                return {
                    "is_valid" : False,
                    "message" : "You are not authorized to complete this transaction. Could not route your cart, try again."
                    }
        else:
            unlock_checkout(user, specified_items=routed_items)
            return {
                "is_valid" : False,
                "message" : "Sorry, we could not lock your transaction. Please try again."
                }
    return {
        "is_valid" : True,
        "message" : "All items in cart have been routed correctly."
        }

def get_orders_for_dropoff(renter_id):
    orders = Orders.filter({"is_dropoff_sched": False, "renter_id": renter_id})
    if orders:
        group_orders = {}
        group_by_date = []
        orders.sort(key=lambda order: order.res_date_start)
        comparitor_date_str = orders[0].res_date_start.strftime("%Y-%m-%d")
        for order in orders:
            date_str = order.res_date_start.strftime("%Y-%m-%d")
            if date_str == comparitor_date_str:
                group_by_date.append(order)
                group_orders[comparitor_date_str] = group_by_date
            else:
                group_by_date = []
                group_by_date.append(order)
                group_orders[date_str] = group_by_date
                comparitor_date_str = date_str
    else:
        group_orders = None
    return group_orders

def get_orders_for_pickup(renter_id):
    orders = Orders.filter({"is_dropoff_sched": True, "is_pickup_sched": True, "renter_id": renter_id})
    if orders:
        group_orders = {}
        group_by_date = []
        orders.sort(key=lambda order: order.ext_date_end)
        comparitor_date_str = orders[0].ext_date_end.strftime("%Y-%m-%d")
        for order in orders:
            date_str = order.ext_date_end.strftime("%Y-%m-%d")
            if date_str == comparitor_date_str:
                group_by_date.append(order)
                group_orders[comparitor_date_str] = group_by_date
            else:
                group_by_date = []
                group_by_date.append(order)
                group_orders[date_str] = group_by_date
                comparitor_date_str = date_str
    else:
        group_orders = None
    return group_orders

def get_delivery_schedule(availabilities):
    """Takes a list of availabilities formatted as `TIME@DATE`"""
    availabilities.sort(key = lambda entry: entry[-10:-1])
    delivery_schedule = {}
    for entry in availabilities:
        delivery_time, delivery_date = entry.split("@")

        if delivery_schedule.get(delivery_date, None):
            delivery_schedule[delivery_date].append(delivery_time)
        else:
            delivery_schedule[delivery_date] = [delivery_time]
    return delivery_schedule
