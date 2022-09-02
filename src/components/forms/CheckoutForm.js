import React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({ setFlashMessages, checkoutSession}) => {
  let statusOK;
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("in-person");
  const [isDisabled, setIsDisabled] = useState(false);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');

    fetch(process.env.REACT_APP_SERVER + `/checkout/validate?session=${checkoutSession}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);
      if (statusOK) {
        fetch(process.env.REACT_APP_SERVER + `/txn=${1}&method=${paymentMethod}`, {
          credentials: 'include'
        })
        fetch(process.env.REACT_APP_SERVER + "/checkout", {
          method: 'POST',
          body: JSON.stringify({
            hubbubId,
            hubbubToken,
            txnToken: 1,
            txnMethod: paymentMethod
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(isStatusOK)
        .then(data => {
          setFlashMessages(data.messages);
          history.push('/inventory');
        })
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
          htmlFor="inPersonPay">In-Person (CashApp, Venmo, or Card)</label>
      </div>
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
      <div className="d-grid gap-2 my-3">
        <input
          className="btn btn-outline-success"
          type='submit'
          value='Order Now'
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}

export default CheckoutForm;
