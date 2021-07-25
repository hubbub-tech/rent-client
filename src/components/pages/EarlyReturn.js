import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { printDate } from '../../helper.js';
import EarlyForm from '../forms/EarlyForm';

const EarlyReturn = ({ cookies, setFlashMessages }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    "item": {"details": {}, "calendar": {}}
  });
  const [urlBase, setUrlBase] = useState(null);

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

  return (
    <main>
      <div className="container-md">
        <div className="row mt-5">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h2 className="text-start">Early Return for { order.item.name } Rental</h2>
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
                    <h4 className="text-start fw-bold">When would you like to return?</h4>
                    <hr />
                    <h4 className="text-start fw-bold">Specs</h4>
                    <p className="text-start">{ order.item.details.description }</p>
                    <p className="text-start my-1">See the items detail page to read more about this item.</p>
                    <div className="d-grid gap-2 mt-3">
                      <Link to={`/inventory/i/id=${order.item.id}`} className="btn btn-outline-dark">See Details</Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <EarlyForm
                      order={order}
                      cookies={cookies}
                      setFlashMessages={setFlashMessages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}

export default EarlyReturn;
