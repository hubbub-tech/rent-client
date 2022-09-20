import { Fragment, useState } from 'react';

import { OrderCard } from './OrderCard';

export const OrderHistory = ({ orders }) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div  className="col-md-8 col-12">
        {orders.map((order, index) => (
          <OrderCard key={order.id} src={null} order={order} />
        ))}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
