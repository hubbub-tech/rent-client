import React from 'react';
import { useState, useEffect } from 'react';

import OrderCard from '../cards/OrderCard';

const Rentals = () => {
  const [user, setUser] = useState({"profile": {}, "cart": {}});
  const [urlBase, setUrlBase] = useState(null);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch(`/accounts/u/rentals`)
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      setRentals(data.rentals);
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
        <div className="row">
          {rentals.map((order) => <OrderCard urlBase={urlBase} order={order} key={order.id} />)}
        </div>
      </div>
    </main>
  );
}

export default Rentals;
