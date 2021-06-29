import React from 'react';
import { useState, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import OrderCard from '../cards/OrderCard';

const Rentals = () => {
  const [urlBase, setUrlBase] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AOS.init({duration : 1000});

    fetch(`/accounts/u/orders`)
    .then(res => res.json())
    .then(data => {
      setOrders(data.orders);
      setUrlBase(data.photo_url);
    });
  }, []);

  return (
    <main>
      <div className="container-md">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-11 mt-5">
            <h1 className="text-start">My Rentals</h1>
            <p className="text-start">See your rental history here, and manage current and past orders.</p>
          </div>
        </div>
        {orders.length !== 0 &&
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <hr />
              {orders.map((order) => <OrderCard urlBase={urlBase} order={order} key={order.id} />)}
            </div>
            <div className="col-md-1"></div>
          </div>
        }
        {orders.length === 0 && <p className="text-center">You haven't placed any orders yet :(</p>}
      </div>
    </main>
  );
}

export default Rentals;
