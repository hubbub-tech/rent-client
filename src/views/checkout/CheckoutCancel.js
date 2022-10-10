import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Feedback } from '../../base/Feedback';
import { FlashContext } from '../../providers/FlashProvider';

export const CheckoutCancel = () => {

  const navigate = useNavigate();
  const { addFlash, removeFlash } = useContext(FlashContext);

  useEffect(() => {
    const renderFlash = async(message, status, timeout = 1000) => {
      addFlash({ message, status });
      setTimeout(() => removeFlash(), timeout);
    };

    const getData = async(url) => {

      const response = await fetch(url, { mode: 'cors', credentials: 'include' });

      const data = response.json();

      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);

      return response;
    };

    getData(process.env.REACT_APP_SERVER + '/checkout/cancel')
    .then(res => navigate('/cart'))
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-16">
            <h1 className="text-center text-hubbub display-3 mt-5">Your order is cancelling...</h1>
            <Feedback />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}
