import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { printDate } from '../../helper.js';
import PickupForm from '../forms/PickupForm';

const Pickups = ({ setFlashMessages }) => {
  const { pickupDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(`/schedule/pickups/${pickupDate}`)
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
