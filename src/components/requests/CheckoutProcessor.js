import React from 'react';
import { useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

const CheckoutProcessor = ({ setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;
  const { token } = useParams();

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? '/checkout' : '/inventory'
    return res.json()
  }

  fetch(`/checkout/confirmation/token=${token}`)
  .then(isStatusOK)
  .then(data => {
    setFlashMessages(data.flashes);
    history.push(redirectUrl);
  });
  
  return <p>Loading...</p>
}

export default CheckoutProcessor;
