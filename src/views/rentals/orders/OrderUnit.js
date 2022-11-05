import { useState } from 'react';
import { RentalItemPhoto } from '../RentalItemPhoto';

import { OrderCancelButton } from './OrderCancelButton';

import { OrderExtendButton } from './OrderExtendButton';
import { OrderAgainButton } from './OrderAgainButton';
import { OrderEarlyReturnButton } from './OrderEarlyReturnButton';

import { printMoney, printDate } from '../../utils.js';


export const OrderUnit = ({ order }) => {

  const dateToday = new Date();
  const [dtStarted, setDtStarted] = useState(new Date(order.res_dt_start * 1000));
  const [dtEnded, setDtEnded] = useState(new Date(order.ext_dt_end * 1000));

  return (
    <div className="container my-3 col-12">
      <div className="row mt-2">
        <div className="col-2">
          <RentalItemPhoto
            href={`/item/${order.item_id}`}
            src={order.item_image_url}
            className="img-fluid"
            alt={order.item_name}
          />
        </div>
        <div className="col-10">
          <div className="row">
            <div className="d-grid col-lg-10 col-md-8 col-10">
              <h2 className="fs-6 fw-bold">{order.item_name}</h2>
              <small className="mb-2">{ printDate(order.res_dt_start) } - { printDate(order.ext_dt_end) }</small>
              <small className="text-muted mb-2">{ order.item_description }</small>
              <div className="d-flex justify-content-start">
                {(dateToday < dtEnded)
                  ? <OrderExtendButton orderId={order.id} />
                  : <OrderAgainButton itemId={order.item_id} />
                }
                {(dateToday < dtEnded) && <OrderEarlyReturnButton orderId={order.id} />}
                {(dateToday < dtStarted) && <OrderCancelButton orderId={order.id} />}
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-2">
              <small className="my-1 d-flex justify-content-end">Price</small>
              <p className="text-success fw-bold my-1 d-flex justify-content-end">{ printMoney(order.total_charge) }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
