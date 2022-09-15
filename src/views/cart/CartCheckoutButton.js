import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartCheckoutButton = ({ disabled, cart, method }) => {

  let navigate = useNavigate();

  const handleCheckoutRequest = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          checkoutSession: cart.checkout_session_key,
          txnMethod: method,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      return data
    };

    postData(process.env.REACT_APP_SERVER + '/checkout/validate')
    .then(data => {
      if (method === 'in-person') navigate('/checkout/success');
      else if (method === 'online') navigate(data.redirect_url);
      else console.log("hey");
    })
    .catch(console.error);
  };


  return (
    <div className="d-grid gap-2">
      <button
        className="btn btn-success"
        type="button"
        onClick={handleCheckoutRequest}
        disabled={disabled}
      >
        Place your order
      </button>
    </div>
  );
}
