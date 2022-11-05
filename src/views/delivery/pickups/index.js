import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { PickupForm } from './PickupForm';
import { DeliveryItem } from '../DeliveryItem';

export const Index = () => {

  const { onTimestamp } = useParams();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = await response.json();

      setOrders(data.orders);
    };

    getData(process.env.REACT_APP_SERVER + `/orders/schedule?dt_ended=${onTimestamp / 1000}`)
    .catch(console.error);
  }, [onTimestamp]);

  return (
    <main>
      <div className="container-md my-3">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-4">
            <h1>Pickup</h1>
            <p>Share when you will be availability for us to pickup your rentals.</p>
            <hr />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
        </div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h2 className="my-3">Rentals</h2>
                {orders.map((order, index) => (
                  <Fragment key={order.id}>
                    <DeliveryItem key={order.id} order={order} />
                    {orders.length !== index + 1 && <hr/>}
                  </Fragment>
                ))}
              </div>
              <div className="col-md-6">
                <PickupForm orders={orders} />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}

export { PickupDates } from './PickupDates';
export { PickupConfirmation } from './PickupConfirmation';
