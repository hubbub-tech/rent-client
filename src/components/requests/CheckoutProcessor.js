import React from 'react';
import { useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

const CheckoutProcessor = ({ setFlashMessages }) => {
  let history = useHistory();
  const { token } = useParams();

  fetch(`/checkout/confirmation/token=${token}`)
  .then(res => res.json())
  .then(res => {
    if (res.ok) {
      res.json().then(data => {
        setFlashMessages(data.flashes);
        history.push('/success'); //success, go to logistics
      });
    } else {
      res.json().then(data => {
        setFlashMessages(data.flashes);
        history.push('/checkout'); //it failed
      });
    }
  });
  return <p>Loading...</p>
}

export default CheckoutProcessor;
