import React from 'react';
import { useState, useEffect } from 'react';

import OrderCard from '../cards/OrderCard';

const Rentals = () => {
  const [urlBase, setUrlBase] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
        <div className="container-md">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11 mt-5">
              <h1>My Rentals</h1>
              <p>See your rental history here, and manage current and past orders.</p>
            </div>
          </div>
        </div>
        <hr />
        {orders.length !== 0 &&
          <div className="row">
            {orders.map((order) => <OrderCard urlBase={urlBase} order={order} key={order.id} />)}
          </div>
        }
        {orders.length === 0 && <p className="text-center">You haven't placed any orders yet :(</p>}
      </div>
    </main>
  );
}

export default Rentals;
