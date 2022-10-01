import { useState, useEffect } from 'react';

import { OrderHistory } from './OrderHistory';


export const Index = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = await response.json();

      setOrders(data.orders);
    };

    getData(process.env.REACT_APP_SERVER + '/orders/history')
    .catch(console.error);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 mt-4">
          <h1>Order History</h1>
          <p>Manage your past, current, and future rentals from here.</p>
          <hr />
        </div>
        <div className="col-md-2"></div>
      </div>
      <OrderHistory orders={orders} />
    </div>
  );
}
