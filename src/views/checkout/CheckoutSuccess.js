import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Feedback } from '../../base/Feedback';

export const CheckoutSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async(url) => {

      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      return response
    };

    getData(process.env.REACT_APP_SERVER + '/checkout')
    .then(res => {
      if (res.ok) navigate('/items/feed');
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
