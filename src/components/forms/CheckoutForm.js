import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({setFlashMessages}) => {
  let history = useHistory();
  let statusOK;
  const [paymentMethod, setPaymentMethod] = useState("in-person");

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault()
    fetch('/checkout/submit', {
      method: 'POST',
      body: JSON.stringify({ paymentMethod }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        history.push(`/checkout/confirmation/token=${data.token}`);
      } else {
        setFlashMessages(data.flashes);
      }
    });
  }

  return (
    <form onSubmit={submit} >
      <p className="text-start fs-6 fw-bold mb-3">Select Payment Method</p>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="payment_method"
          id="inPersonPay"
          value="in-person"
          onChange={e => setPaymentMethod("in-person")} />
        <label
          className="form-check-label"
          htmlFor="inPersonPay">In-Person (CashApp, Venmo, Cash, or Card)</label>
      </div>
      { /*
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment_method"
            id="onlinePay"
            onChange={e => setPaymentMethod("online")} />
          <label
            className="form-check-label"
            htmlFor="onlinePay">Online (Paypal or Card)</label>
        </div>
      */ }
      <div className="d-grid gap-2 my-3">
        <input className="btn btn-outline-success" type='submit' value='Order Now' />
      </div>
    </form>
  );
}

export default CheckoutForm;
