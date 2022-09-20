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
    <OrderHistory orders={orders} />
  );
}
