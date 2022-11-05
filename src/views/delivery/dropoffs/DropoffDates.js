import { useState, useEffect } from 'react';

import { DropoffBundle } from './DropoffBundle';

export const DropoffDates = ({ orders }) => {

  const initDropoff = { date: null, orders: [] };
  const initDropoffs = [initDropoff];
  const [dropoffs, setDropoffs] = useState(initDropoffs);

  useEffect(() => {
    let memoDropoffs = {};

    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      (memoDropoffs.hasOwnProperty(order.res_dt_start))
        ? memoDropoffs[order.res_dt_start].push(order)
        : memoDropoffs[order.res_dt_start] = [order];
    }

    let dates = Object.keys(memoDropoffs);
    let unschedDropoffs = [];

    for (let i = 0; i < dates.length; i++) {
      let date = dates[i];
      let orders = memoDropoffs[date];

      unschedDropoffs.push({ date, orders });
    }

    setDropoffs(unschedDropoffs);
  }, [orders]);

  return (orders.length > 0)
    ? <div className="row">
      {dropoffs.map((dropoff, index) => (
        <DropoffBundle key={dropoff.date} date={dropoff.date} orders={dropoff.orders} />
      ))}
      </div>
    : null;
}
