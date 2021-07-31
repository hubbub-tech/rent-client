import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import PickupForm from '../forms/PickupForm';

const Pickups = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const { pickupDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/schedule/pickups/${pickupDate}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setAddress(data.address);
        setOrders(data.orders_to_pickup);
      } else if (statusCode) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      }
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
