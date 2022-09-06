import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNagivate } from 'react-router-dom';

import { printDate } from '../../helper.js';
import AddressForm from './AddressForm';
import TimeRangeInput from '../inputs/TimeRangeInput';

const DropoffForm = ({ orders, dropoffDate, address, setFlashMessages, setAddress }) => {
  let statusOK;
  const history = useNagivate();
  const addressDisplay = `${address.line_1} ${address.line_2}, ${address.city}, ${address.state} ${address.zip}`;
  const [timeslot, setTimeslot] = useState({start: null, end: null});
  const [isValid, setIsValid] = useState(false)

  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [referral, setReferral] = useState(null);
  const [notes, setNotes] = useState(null);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const handleStartOnChange = (e) => {
    setTimeslot({...timeslot, start: e.target.value});
  }

  const handleEndOnChange = (e) => {
    setTimeslot({...timeslot, end: e.target.value});
    console.log(timeslot)
  }

  const submit = (e) => {
    e.preventDefault();

    setIsDisabled(true);

    let timeslots = [timeslot];

    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + '/delivery/schedule', {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        notes,
        orders,
        receiverId: null,
        senderId: 32,
        referral,
        timeslots,
        fromAddress: {
          lineOne: "70 Morningside Drive",
          lineTwo: " ",
          city: "New York",
          state: "NY",
          zip: "10027",
          country: "USA"
        },
        toAddress: {
          lineOne: address.line_1,
          lineTwo: address.line_2,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: "USA"
        }
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);
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
            <h4 className="text-start">Orders to Dropoff</h4>
            <div className="col-5 border-end border-dark">
              <p className="text-start fw-bold mb-1">Items</p>
              <ul className="list-group list-group-flush">
                {orders.map((order) => <li className="list-group-item" key={order.id}>{order.item_name}</li>)}
              </ul>
            </div>
            <div className="col-1"></div>
            <div className="col-6">
              <p className="text-start fw-bold">Timeslots</p>
              <TimeRangeInput
                start={timeslot.start}
                end={timeslot.end}
                handleStartOnChange={handleStartOnChange}
                handleEndOnChange={handleEndOnChange}
                setIsValid={setIsValid}
              />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h4>Instructions</h4>
          <p>On this form, you'll see your rental(s) beginning on {printDate(dropoffDate)}.</p>
          <p>You'll also see a series of timeslots during which we can drop off your order(s) for that day. Please select the times for which you are available. If you can, <strong>select as many as possible</strong> so we can quick schedule your drop off.</p>
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
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="referralName"
              name="referral"
              placeholder="Alexander Hamilton"
              onChange={e => setReferral(e.target.value)}
              minLength="1"
              maxLength="100"
              required
            />
            <label htmlFor="referralName">Referral Name</label>
          </div>
          <small className="card-text">
            <font size="-1">Please provide a complete address for your drop off location.</font>
          </small>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              name="isDefaultAddress"
              id="isDefaultAddressCheckbox"
              type="checkbox"
              checked={!isDefaultAddress}
              onChange={e => setIsDefaultAddress(!isDefaultAddress)}
              disabled={!isDefaultAddress}
            />
          <label className="form-check-label" htmlFor="isDefaultAddressCheckbox">
              {isDefaultAddress && 'Would you like to change your default delivery address? It is currently:'}
              {!isDefaultAddress && `Your delivery address is now:`}
              <span className="text-hubbub"> {addressDisplay}</span>
            </label>
          </div>
          <br />
          {!isDefaultAddress && <AddressForm address={address} setAddress={setAddress} required={!isDefaultAddress} />}
          <small className="card-text">
            <font size="-1">Share whatever details you think are relevant to make your delivery smoother.</font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="deliveryNotes"
              name="notes"
              placeholder="Leave delivery notes here."
              onChange={e => setNotes(e.target.value)}
              required
            />
            <label htmlFor="deliveryNotes"> Delivery Notes</label>
          </div>
          <div className="d-grid gap-2">
            <input
              className="btn btn-outline-success"
              type="submit"
              value="Submit"
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
      <div className="col-md-1"></div>
    </form>
  );
}

export default DropoffForm;
