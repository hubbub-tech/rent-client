import { useState, useEffect } from 'react';

export const PickupScheduleCard = ({ orders }) => {

  const [unschedOrders, setUnschedOrders] = useState([]);

  useEffect(() => {
    let unscheduledOrders = [];

    if (orders)
      for (let i = 0; i < orders.length; i++) {
        let currOrder = orders[i];
        if (!currOrder.pickup_id) unscheduledOrders.push(currOrder);
      }

    setUnschedOrders(unscheduledOrders);
  }, [orders]);

  return (unschedOrders.length > 0)
    ? <div className="card float">
        <div className="card-body">
          <p className="card-text fs-5 fw-bold">You have orders in need of pickup scheduling!</p>
          <a href="/rentals/schedule#pickups" className="btn btn-hubbub btn-sm">Schedule Pickup {'->'}</a>
        </div>
      </div>
    : null;
}
