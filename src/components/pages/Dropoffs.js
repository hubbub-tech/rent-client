import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import DropoffForm from '../forms/DropoffForm';

const Dropoffs = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const { dropoffDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/schedule/dropoffs/${dropoffDate}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setAddress(data.address);
        setOrders(data.orders_to_dropoff);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      }
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
