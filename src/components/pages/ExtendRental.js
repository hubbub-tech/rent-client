import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';
import FeedbackForm from '../forms/FeedbackForm';
import ExtendForm from '../forms/ExtendForm';

const ExtendRental = ({ cookies, setFlashMessages }) => {
  let statusOK;
  let history = useHistory();
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    "item": {"details": {}, "calendar": {}},
  });
  const [urlBase, setUrlBase] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/accounts/o/id=${orderId}`, {
      method: 'POST',
      body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      setOrder(data.order);
      setUrlBase(data.photo_url);
    });
  }, [orderId]);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const extendRental = () => {
    let startDate = null;
    let extendDate = null;
    if (reservation !== null) {
      startDate = reservation.date_started;
      extendDate = reservation.date_ended;
    }
    fetch(process.env.REACT_APP_SERVER + '/accounts/o/extend/submit', {
      method: 'POST',
      body: JSON.stringify({
        "userId": cookies.userId,
        "auth": cookies.auth,
        "itemId": order.item.id,
        "orderId": order.id,
        startDate,
        extendDate
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push(`/accounts/u/id=${order.reservation.renter_id}`);
      }
    });
  }
  return (
    <main>
      <div className="container-md">
        <div className="row mt-5">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h2 className="text-start">Extend { order.item.name } Rental</h2>
            <p className="text-start fs-4">ending on { printDate(order.ext_date_end) }</p>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-3 mt-5">
            <img
              className="card-img img-fluid"
              src={`${urlBase}/${order.item.id}.jpg`}
              alt={order.item.name}
            />
          </div>
          <div className="col-md-7 mt-5">
            <div className="card px-0 mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mt-4">
                    {reservation && <h4 className="text-start fw-bold">Rent for <span className={`${reservation && 'highlight-alert'}`}>{printMoney(reservation.charge)}</span></h4>}
                    {!reservation && <h4 className="text-start fw-bold">Until when do you want to extend?</h4>}
                    <hr />
                    <h4 className="text-start fw-bold">Specs</h4>
                    <p className="text-start">{ order.item.details.description }</p>
                    <p className="text-start my-1">See the items detail page to read more about this item.</p>
                    <div className="d-grid gap-2 mt-3">
                      <Link to={`/inventory/i/id=${order.item.id}`} className="btn btn-outline-dark">See Details</Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <ExtendForm
                      order={order}
                      cookies={cookies}
                      setFlashMessages={setFlashMessages}
                      setReservation={setReservation}
                    />
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn btn-success"
                        onClick={extendRental}
                        disabled={reservation === null}>
                        Extend Rental
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FeedbackForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}

export default ExtendRental;
