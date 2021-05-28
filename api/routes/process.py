from datetime import datetime, date, timedelta
from flask import Blueprint, flash, g, redirect, request, session, Markup

from blubber_orm import Users, Orders
from blubber_orm import Items, Tags

from api.tools.settings import lock_checkout, check_if_routed
from api.tools.settings import login_required, transaction_auth, AWS
from api.tools.build import create_order
from api.tools import blubber_instances_to_dict

bp = Blueprint('process', __name__)

#Accepts payment choice from the checkout form
@bp.route("/checkout/router&token=<token>&method=<payment_method>")
@transaction_auth
@login_required
def router(token, payment_method):
    cart_response = lock_checkout(g.user)
    if cart_response["is_valid"]:
        #Redirect depending on payment method
        if method == "online":
            return redirect(f"/checkout/payment&token={token}")
        else:
            # default to in-person payment, skip to confirmation
            for item in g.user.cart.contents:
                item.is_routed = True
            return redirect(f"/checkout/confirmation&token={token}&method={method}")
    else:
        flash(cart_response["message"])
        return redirect("/checkout")


#Accepts payment choice from the checkout form
@bp.route("/checkout/payment&token=<token>")
@transaction_auth
@login_required
def payment(token):
    pass #TODO: payment method API in here and route items in cart

@bp.route("/checkout/confirmation&token=<token>&method=<payment_method>")
@transaction_auth
@login_required
def confirmation(token, payment_method):
    cart_data = {}
    routing_response = check_if_routed(g.user)
    if routing_response["is_valid"]:
        _cart_contents = g.user.cart.contents # need this because cart size changes
        for item in _cart_contents:
            _reservation = Reservations.filter({
                "renter_id": g.user.id,
                "item_id": item.id,
                "is_in_cart": True
            })
            reservation, = _reservation
            item.calendar.add(reservation)
            order_data = {
                "res_date_start": reservation.date_started,
                "res_date_end": reservation.date_ended,
                "renter_id": reservation.renter_id,
                "item_id": reservation.item_id,
                "is_online_pay": payment_method,
                "lister_id": item._lister_id,
                "date_placed": date.today(),
            }
            order = create_order(order_data)
            transaction_summary = {
                "item": item,
                "order": order,
                "start": reservation.date_started,
                "end": reservation.date_ended,
                "cost": reservation.print_charge(),
                "deposit": reservation.print_deposit()
            }
            #TODO: send email receipt to lister
            cart_data[str(order.id)] = transaction_summary # important for renters receipt
            g.user.cart.remove(reservation)
            item.unlock()
        #TODO: send email receipt to renter
        flash("Successfully rented all items! Now, just let us know when we can drop them off.")
        return redirect("/checkout/logistics")
    else:
        flash(routing_response["message"])
        return redirect("/checkout")
