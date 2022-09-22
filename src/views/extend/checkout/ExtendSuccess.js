import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Feedback } from '../../../base/Feedback';

export const ExtendSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const postData = async(url) => {

      const cacheStorage = await caches.open('extensionData');
      const cachedResponse = await cacheStorage.match(process.env.REACT_APP_SERVER + '/extend/success');
      const cachedData = await cachedResponse.json();

      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          orderId: cachedData.order_id,
          dtEnded: Math.floor(cachedData.ext_dt_end),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      return response;
    };

    postData(process.env.REACT_APP_SERVER + '/orders/extend')
    .then(res => {
      if (res.ok) navigate('/orders/history');
      else navigate('/cart');
    })
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-16">
            <h1 className="text-center text-hubbub display-3 mt-5">Reserving your items...</h1>
            <Feedback />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}
