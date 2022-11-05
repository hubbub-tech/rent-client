import { useState, useEffect } from 'react';

import { PickupEventItem } from './PickupEventItem';

import { RentalsCancelLogisticsButton } from '../RentalsCancelLogisticsButton';
import { printDate } from '../../utils.js';

export const PickupEvent = ({ pickup, orders }) => {
  const dateToday = new Date();

  const [dtPickup, setDtPickup] = useState(undefined);
  const [dtEnded, setDtEnded] = useState(undefined);

  const defaultMessage = 'Your delivery is pending...';
  const [statusMessage, setStatusMessage] = useState(defaultMessage);

  useEffect(() => {

    let currDtEnded = new Date(orders[0].ext_dt_end * 1000);
    let currDtPickup = (dateToday > currDtEnded && pickup.dt_received)
      ? new Date(pickup.dt_received * 1000)
      : currDtEnded;

    setDtEnded(currDtEnded);
    setDtPickup(currDtPickup);

    let draftStatusMessage = (dateToday > currDtEnded)
      ? `Picked up on ${ printDate(currDtPickup.getTime() / 1000) }`
      : `Collecting on ${ printDate(currDtPickup.getTime() / 1000) }`;

    setStatusMessage(draftStatusMessage);
  }, []);

  return (
    <div className="col-12 my-4">
      <div className="row">
        <div className="d-grid col-lg-10 col-md-8 col-9">
          <h2 className="fs-6 fw-bold">{ statusMessage }</h2>
          <small className="mb-2"><span className="fw-bold">From:</span> { pickup.from.formatted }</small>
          <small className="text-muted mb-2">Notes: { pickup.notes ? pickup.notes : 'No notes provided.' }</small>
          <small className="mb-1 fw-bold">Items:</small>
          {orders.map((order, index) => (
            <PickupEventItem key={order.id} order={order} />
          ))}
        </div>
        <div className="col-lg-2 col-md-4 col-3">
          <h3 className="me-2 mb-3 fs-6 fw-bold d-flex justify-content-end">Options</h3>
          {(dateToday < dtEnded) && <RentalsCancelLogisticsButton logisticsId={pickup.id} />}
        </div>
      </div>
    </div>
  );
}
