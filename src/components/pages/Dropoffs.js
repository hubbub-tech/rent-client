import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DropoffForm from '../forms/DropoffForm';

const Dropoffs = ({ setFlashMessages }) => {
  const { dropoffDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(`/schedule/dropoffs/${dropoffDate}`)
    .then(res => res.json())
    .then(data => {
      setAddress(data.address);
      setOrders(data.orders_to_dropoff);
    });
  }, [dropoffDate]);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h1>Drop-off Scheduler for {dropoffDate}</h1>
            <p>Share when you will be availability for us to deliver your rentals.</p>
            <hr/>
          </div>
          <div className="col-md-1"></div>
        </div>
        <DropoffForm
          orders={orders}
          address={address}
          setAddress={setAddress}
          dropoffDate={dropoffDate}
          setFlashMessages={setFlashMessages}
        />
      </div>
    </main>
  );
}

export default Dropoffs;
