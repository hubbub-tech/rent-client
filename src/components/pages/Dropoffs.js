import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useAnalytics } from '../base/GoogleTags';
import { printDate } from '../../helper.js';
import DropoffForm from '../forms/DropoffForm';

const Dropoffs = ({ cookies, setFlashMessages }) => {
  const location = useLocation();
  useAnalytics(location.pathname);

  const { dropoffDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/schedule/dropoffs/${dropoffDate}`, {
      method: 'POST',
      body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
      headers: { 'Content-Type': 'application/json' },
    })
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
            <h1>Drop-off Scheduler for {printDate(dropoffDate)}</h1>
            <p>Share when you will be availability for us to deliver your rentals.</p>
            <hr/>
          </div>
          <div className="col-md-1"></div>
        </div>
        <DropoffForm
          orders={orders}
          cookies={cookies}
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
