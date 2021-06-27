import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SingleDateForm from '../forms/SingleDateForm';

const EarlyReturn = ({ setFlashMessages }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    "item": {"details": {}, "calendar": {}},
  });
  const [urlBase, setUrlBase] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetch(`/accounts/o/id=${orderId}`)
    .then(res => res.json())
    .then(data => {
      setOrder(data.order);
      setUrlBase(data.photo_url);
    });
  }, [orderId]);

  const earlyReturn = () => {
    let earlyDate = reservation.date_ended;
    fetch('/accounts/o/early/confirmation', {
      method: 'POST',
      body: JSON.stringify({ earlyDate }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => setFlashMessages(data.flashes));
  }

  return (
    <main>
      <div className="container-md">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-11 mt-5">
            <h2 className="text-start">Early Return on { order.item.name } Rental</h2>
            <p className="text-start fs-4">ending on { order.ext_date_end }</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6 mt-5">
            <img
              className="card-img-top rounded"
              src={`${urlBase}/${order.item.id}.jpg`}
              alt={order.item.name} />
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                {/*reservation && <p className="text-start fs-5 fw-bold">Extend for <mark>{reservation.charge}</mark></p>*/}
                {!reservation && <p className="text-start fs-5 fw-bold">When would you like to return the rental?</p>}
                <SingleDateForm
                  calendar={order.item.calendar}
                  fixedDate={order.res_date_start}
                  setFlashMessages={setFlashMessages}
                  setReservation={setReservation}
                />
                {reservation &&
                  <div className="d-grid gap-2 my-3">
                    <button className="btn btn-success" onClick={earlyReturn}>Early Return Now</button>
                  </div>
                }
                <hr />
                <p className="text-start fs-5 fw-bold">Description</p>
                <p className="text-start">{ order.item.details.description }</p>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mt-3">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <p className="text-start fs-5 fw-bold">More Info</p>
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <p><strong>Location</strong> - SOMEWHERE</p>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <p><strong>Condition</strong> - { order.item.details.condition }</p>
                  </div>
                  <div className="col-lg-3 col-md-6"><p>
                    <strong>Weight</strong> - { order.item.details.weight }</p>
                  </div>
                  <div className="col-lg-3 col-md-6"><p>
                    <strong>Volume</strong> - { order.item.details.volume }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}

export default EarlyReturn;
