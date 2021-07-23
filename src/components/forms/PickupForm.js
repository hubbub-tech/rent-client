import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import AddressForm from './AddressForm';
import CheckboxList from '../inputs/CheckboxList';

const PickupForm = ({ orders, cookies, pickupDate, address, setFlashMessages, setAddress }) => {
  let statusOK;
  let history = useHistory();
  const addressDisplay = `${address.num} ${address.street}, ${address.city}`;
  const timeslots = [
    "8-9am","9-10am", "10-11am", "11-12pm", "12-1pm",
    "1-2pm", "2-3pm", "3-4pm", "4-5pm", "5-6pm"
  ];
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [timesChecked, setTimesChecked] = useState([]);
  const [notes, setNotes] = useState(null);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }
  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/schedule/pickups/submit', {
      method: 'POST',
      body: JSON.stringify({
        "userId": cookies.userId,
        "auth": cookies.auth,
        notes,
        orders,
        timesChecked,
        pickupDate,
        address
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push('/accounts/u/orders');
      }
    });
    window.scrollTo(0, 0);
  }

  return (
    <form onSubmit={submit}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="row no-gutters">
            <h4 className="text-start">Orders to Pickup</h4>
            <div className="col-5 border-end border-dark">
              <p className="text-start fw-bold mb-1">Items</p>
              <ul className="list-group list-group-flush">
                {orders.map((order) => <li className="list-group-item" key={order.id}>{order.item.name}</li>)}
              </ul>
            </div>
            <div className="col-1"></div>
            <div className="col-6">
              <p className="text-start fw-bold">Timeslots</p>
              <CheckboxList checkboxes={timeslots} onChangeCheckbox={setTimesChecked} />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h4>Instructions</h4>
          <p>On this form, you'll see the items you're returning on {printDate(pickupDate)}.</p>
          <p>You'll also see a series of timeslots during which we can pick up your rentals. Please select the times for which you are available. If you can, <strong>select as many as possible</strong> so we can quick schedule your pick up.</p>
          <p>Finally, we want to give you some flexibility in describing your availability and location. Please feel free to add any relevant details for pick up under "Pickup Notes". Thanks!</p>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <small className="card-text"><font size="-1">Please provide a complete address for your rental pick up.</font></small>
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
              Should we pickup from the following address: {addressDisplay}?
            </label>
          </div>
          <br />
          {!isDefaultAddress && <AddressForm address={address} setAddress={setAddress} required={!isDefaultAddress} />}

          <small className="card-text">
            <font size="-1">Share whatever details you think are relevant to make your pick up smoother.</font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingNotes"
              name="notes"
              placeholder="Leave pickup notes here."
              onChange={e => setNotes(e.target.value)}
              required
            />
          <label htmlFor="floatingNotes"> Pickup Notes</label>
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

export default PickupForm;
