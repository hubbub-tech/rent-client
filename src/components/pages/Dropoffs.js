import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useNagivate } from 'react-router-dom';

import { printDate } from '../../helper.js';
import DropoffForm from '../forms/DropoffForm';

const Dropoffs = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useNagivate();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const { dropoffDate } = useParams();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/orders/schedule?dt_started=${dropoffDate}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setOrders(data.orders);
        setAddress(data.address);
        setFlashMessages(data.messages);
      } else if (statusCode === 403) {
        history.push('/logout');
      } else if (statusCode === 404) {
        history.push('/404');
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
