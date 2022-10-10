import { useState, Fragment } from 'react';
import { OrderItemPhoto } from './OrderItemPhoto';

import { OrderCancelButton } from './OrderCancelButton';

import { EarlyReturnButton } from './early-return/EarlyReturnButton';
import { OrderExtendButton } from './OrderExtendButton';
import { OrderViewItemButton } from './OrderViewItemButton';

import { OrderScheduleDropoffLink } from './OrderScheduleDropoffLink';
import { OrderSchedulePickupLink } from './OrderSchedulePickupLink';

import { EarlyReturnView } from './early-return/EarlyReturnView';
import { printMoney, printDate } from '../utils.js';


export const OrderCard = ({ src, order }) => {

  const [showEarlyReturnView, setShowEarlyReturnView] = useState(false);
  const [showExtendView, setShowExtendView] = useState(false);

  const [dtStarted, setDtStarted] = useState(new Date(order.res_dt_start * 1000));

  const dtNow = new Date();
  const dtEnded = new Date(order.ext_dt_end * 1000);

  if (showEarlyReturnView === false) return (
    <div className="card my-2">
      <h5 className="fs-6 card-header">from { printDate(order.res_dt_start) } to { printDate(order.ext_dt_end) }</h5>
      <div className="card-body mb-0">
        <div className="row mt-2">
          <div className="col-lg-2 col-md-3 col-4">
            <OrderItemPhoto
              href={`/item/${order.item_id}`}
              className="img-fluid"
              alt={order.item_name}
              src={src}
            />
          </div>
          <div className="col-lg-10 col-md-9 col-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h1 className="fs-6 card-title">{order.item_name}</h1>
                  <div className="text-small mb-1">
                    Total:
                    <small className="text-success"> { printMoney(order.total_charge) }</small>
                  </div>
                  <div className="text-small mb-1">
                    Total Deposit:
                    <small className="text-success"> { printMoney(order.total_deposit) }</small>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-grid gap-2 d-flex justify-content-end">
                  {dtNow < dtEnded && <EarlyReturnButton setShowEarlyReturnView={setShowEarlyReturnView} />}
                  {dtStarted > dtNow && <OrderCancelButton orderId={order.id} />}
                  {(dtStarted <= dtNow && dtNow < dtEnded ) && <OrderExtendButton orderId={order.id} />}
                  {dtNow > dtEnded && <OrderViewItemButton itemId={order.item_id} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {dtNow < dtEnded &&
          <Fragment>
            {order.dropoff_id === null && (
              <OrderScheduleDropoffLink
                dtDropoff={order.res_dt_start}
                dropoffId={order.dropoff_id}
              />
            )}
            {(order.dropoff_id === null && order.pickup_id === null) && <span>|</span>}
            {order.pickup_id === null && (
              <OrderSchedulePickupLink
                dtPickup={order.ext_dt_end}
                pickupId={order.pickup_id}
              />
            )}
          </Fragment>
        }
      </div>
    </div>
  )
  else return (
    <EarlyReturnView order={order} setShowEarlyReturnView={setShowEarlyReturnView} />
  );
}
