import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AddressForm from './AddressForm';
import TextInput from '../inputs/TextInput';
import CheckboxList from '../inputs/CheckboxList';

const DropoffForm = ({ orders, dropoffDate, address, setFlashMessages, setAddress }) => {
  let redirectUrl;
  let history = useHistory();
  const addressDisplay = `${address.num} ${address.street}, ${address.city}`;
  const timeslots = [
    "8-9am","9-10am", "10-11am", "11-12pm", "12-1pm",
    "1-2pm", "2-3pm", "3-4pm", "4-5pm", "5-6pm"
  ];
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [timesChecked, setTimesChecked] = useState([]);
  const [referral, setReferral] = useState(null);
  const [notes, setNotes] = useState(null);

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? '/accounts/u/orders' : null;
    return res.json()
  }
  const submit = (e) => {
    e.preventDefault();
    fetch('/schedule/dropoffs/submit', {
      method: 'POST',
      body: JSON.stringify({
        notes,
        orders,
        referral,
        timesChecked,
        dropoffDate,
        address
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (redirectUrl) {
        history.push(redirectUrl);
      }
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="row no-gutters">
            <div className="col-6">
              <h4 className="text-start">Orders to Dropoff</h4>
              {orders.map((order) => <p className="text-start" key={order.id}>{order.item.name}</p>)}
            </div>
            <div className="col-6">
              <CheckboxList checkboxes={timeslots} onChangeCheckbox={setTimesChecked} />
            </div>
          </div>
          <hr />
        </div>
        <div className="col-md-5">
          <h4>Instructions</h4>
          <p>On the left, you'll see the items you've recently ordered, grouped by the day that rental is scheduled to begin.</p>
          <p>On the right, you'll see a series of timeslots during which we can drop off your order(s) for that day. Please select the times for which you are available. If you can, <strong>select as many as possible</strong> so we can quick schedule your drop off.</p>
          <p>Finally, we want to give you some flexibility in describing your availability and location. Please feel free to add any relevant details for delivery under "Delivery Notes". Thanks!</p>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <small className="card-text">
            <font size="-1">Did someone refer you? Share their name below and both of you will get rewarded!</font>
          </small>
          <TextInput
            id="floatingInput"
            name="referral"
            label="Referral Name"
            placeholder="Alexander Hamilton"
            onChange={e => setReferral(e.target.value)}
            minLength="1"
            maxLength="100"
            required={true}
          />
        <small className="card-text"><font size="-1">Please provide a complete address for your drop off location.</font></small>
          <div className="form-check">
            <input
              className="form-check-input"
              name="isDefaultAddress"
              id="isDefaultAddressCheckbox"
              type="checkbox"
              checked={isDefaultAddress}
              onChange={e => setIsDefaultAddress(!isDefaultAddress)}
            />
            <label className="form-check-label" htmlFor="isDefaultAddressCheckbox">
              Should we deliver to the following address: {addressDisplay}?
            </label>
          </div>
          <br />
          {!isDefaultAddress && <AddressForm address={address} setAddress={setAddress} />}

          <small className="card-text">
            <font size="-1">Share whatever details you think are relevant to make your delivery smoother.</font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingNotes"
              name="notes"
              placeholder="Leave delivery notes here."
              onChange={e => setNotes(e.target.value)}
              required
            />
            <label htmlFor="floatingNotes"> Delivery Notes</label>
          </div>
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type="submit" value="Submit" />
          </div>
        </div>
      </div>
      <div className="col-md-1"></div>
    </form>
  );
}

export default DropoffForm;
