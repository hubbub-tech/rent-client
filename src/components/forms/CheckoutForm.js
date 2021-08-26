import React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({ setFlashMessages}) => {
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
    fetch(process.env.REACT_APP_SERVER + '/checkout/submit', {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        Cookies.set('cartSize', 0, { expires: 7 });
        history.push('/accounts/u/orders');
      } else {
        history.push('/inventory');
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
