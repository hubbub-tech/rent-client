import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useAnalytics } from '../base/GoogleTags';
import { printDate } from '../../helper.js';
import PickupForm from '../forms/PickupForm';

const Pickups = ({ cookies, setFlashMessages }) => {
  const location = useLocation();
  useAnalytics(location.pathname);

  const { pickupDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/schedule/pickups/${pickupDate}`, {
      method: 'POST',
      body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      setAddress(data.address);
      setOrders(data.orders_to_pickup);
    });
  }, [pickupDate]);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h1>Pick-up Scheduler for {printDate(pickupDate)}</h1>
            <p>Share when you will be available for us to pick up your rentals.</p>
            <hr />
          </div>
          <div className="col-md-1"></div>
        </div>
        <PickupForm
          orders={orders}
          cookies={cookies}
          address={address}
          setAddress={setAddress}
          pickupDate={pickupDate}
          setFlashMessages={setFlashMessages}
        />
      </div>
    </main>
  );
}

export default Pickups;
