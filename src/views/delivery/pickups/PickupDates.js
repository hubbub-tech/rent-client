import { useState, useEffect } from 'react';

import { PickupBundle } from './PickupBundle';

export const PickupDates = ({ orders }) => {

  const initPickup = { date: null, orders: [] };
  const initPickups = [initPickup];
  const [pickups, setPickups] = useState(initPickups);

  useEffect(() => {
    let memoPickups = {};

    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      (memoPickups.hasOwnProperty(order.ext_dt_end))
        ? memoPickups[order.ext_dt_end].push(order)
        : memoPickups[order.ext_dt_end] = [order];
    }

    let dates = Object.keys(memoPickups);
    let unschedPickups = [];

    for (let i = 0; i < dates.length; i++) {
      let date = dates[i];
      let orders = memoPickups[date];

      unschedPickups.push({ date, orders });
    }

    setPickups(unschedPickups);
  }, [orders]);

  return (orders.length > 0)
    ? <div className="row">
      {pickups.map((pickup, index) => (
        <PickupBundle key={pickup.date} date={pickup.date} orders={pickup.orders} />
      ))}
      </div>
    : null;
}
