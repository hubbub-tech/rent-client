import React from 'react';

const DropoffForm = () => {

  return (
    <form method="POST" action="/checkout/logistics">
      <div class="row d-flex justify-content-center">
        <div class="col-md-1"></div>
        <div class="col-md-5">
        {% for date in recent_orders_dates %}
          <h4>Drop off: {{ formatted_dates[date] }}</h4>
          <div class="row no-gutters">
            <div class="col-4">
            {% for order in recent_orders[date] %}
              <p>{{ order.item_name }}</p>
            {% endfor %}
            </div>

            <div class="col-4">
            {% for slot in pm_slots %}
              <input class="form-check-input" type="checkbox" id="{{ loop.index }}" name="availability" value="{{ slot }}@{{ date }}">
              <label class="form-check-label" for="{{ loop.index }}"> {{ slot }}</label><br>
            {% endfor %}
            </div>
          </div>
          <hr>
        {% endfor %}
        </div>
        <div class="col-md-5">
          <h4>Instructions</h4>
          <p>On the left, you'll see the items you've recently ordered, grouped by the day that rental is scheduled to begin.</p>
          <p>On the right, you'll see a series of timeslots during which we can drop off your order(s) for that day. Please select the times for which you are available. If you can, <strong>select as many as possible</strong> so we can quick schedule your drop off.</p>
          <p>Finally, we want to give you some flexibility in describing your availability and location. Please feel free to add any relevant details for delivery under "Delivery Notes". Thanks!</p>
        </div>
        <div class="col-md-1"></div>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <small class="card-text"><font size="-1">Did someone refer you? Share their name below and both of you will get rewarded!</font></small>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" name="referral" minlength="1" required>
            <label for="floatingInput"> Referral Name</label>
          </div>
          <small class="card-text"><font size="-1">Please provide a complete address for your drop off location.</font></small>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" name="location" minlength="1" required>
            <label for="floatingInput"> Precise Location</label>
          </div>
          <small class="card-text"><font size="-1">Share whatever details you think are relevant to make your delivery smoother.</font></small>
          <div class="form-floating mb-3">
            <textarea class="form-control" name="notes" placeholder="Leave delivery notes here." id="floatingTextarea" required></textarea>
            <label for="floatingTextarea"> Delivery Notes</label>
          </div>
          <div class="d-grid gap-2"><input class="btn btn-outline-success"  onclick="return isSelected()" type="submit" value="Submit"></input></div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </form>
  );
}

export default DropoffForm;
