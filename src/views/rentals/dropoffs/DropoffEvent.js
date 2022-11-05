import { useState, useEffect } from 'react';

import { DropoffEventItem } from './DropoffEventItem';

import { RentalsCancelLogisticsButton } from '../RentalsCancelLogisticsButton';
import { printDate } from '../../utils.js';

export const DropoffEvent = ({ dropoff, orders }) => {
  const dateToday = new Date();

  const [dtDropoff, setDtDropoff] = useState(undefined);
  const [dtStarted, setDtStarted] = useState(undefined);

  const defaultMessage = 'Your delivery is pending...';
  const [statusMessage, setStatusMessage] = useState(defaultMessage);

  useEffect(() => {

    let currDtStarted = new Date(orders[0].res_dt_start * 1000);
    let currDtDropoff = (dateToday > currDtStarted && dropoff.dt_received)
      ? new Date(dropoff.dt_received * 1000)
      : currDtStarted;

    setDtStarted(currDtStarted)
    setDtDropoff(currDtDropoff)

    let draftStatusMessage = (dateToday > currDtStarted)
      ? `Delivered on ${ printDate(currDtDropoff.getTime() / 1000) }`
      : `Arriving on ${ printDate(currDtDropoff.getTime() / 1000) }`;

    setStatusMessage(draftStatusMessage);
  }, []);

  return (
    <div className="col-12 my-4">
      <div className="row">
        <div className="d-grid col-lg-10 col-md-8 col-9">
          <h2 className="fs-6 fw-bold">{ statusMessage }</h2>
          <small className="mb-2"><span className="fw-bold">To:</span> { dropoff.to.formatted }</small>
          <small className="text-muted mb-2">Notes: { dropoff.notes ? dropoff.notes : 'No notes provided.' }</small>
          <small className="mb-1 fw-bold">Items:</small>
          {orders.map((order, index) => (
            <DropoffEventItem key={order.id} order={order} />
          ))}
        </div>
        <div className="col-lg-2 col-md-4 col-3">
          <h3 className="me-2 mb-3 fs-6 fw-bold d-flex justify-content-end">Options</h3>
          {(dateToday < dtStarted) && <RentalsCancelLogisticsButton logisticsId={dropoff.id} />}
        </div>
      </div>
    </div>
  );
}
