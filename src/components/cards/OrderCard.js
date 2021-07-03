import moment from 'moment';

import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';

const OrderCard = ({ urlBase, order }) => {
  let history = useHistory();

  let todaysDateStr = moment.utc().format("YYYY-MM-DD");
  let isActive = todaysDateStr < order.ext_date_end

  const handleDropoffOnClick = () => {
    history.push(`/schedule/dropoffs/${order.res_date_start}`)
  }

  const handlePickupOnClick = () => {
    history.push(`/schedule/pickups/${order.ext_date_end}`)
  }

  const handleEarlyOnClick = () => {
    history.push(`/accounts/o/early/id=${order.id}`)
  }

  const handleExtendOnClick = () => {
    history.push(`/accounts/o/extend/id=${order.id}`)
  }

  return (
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Order Placed</strong></p>
            <p className="text-start my-0">{printDate(order.date_placed)}
              {order.is_extended && <span className="badge bg-success">extended</span>}
            </p>
          </div>
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Charge</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.charge)}</p>
          </div>
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Deposit</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.deposit)}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-2 my-2">
            <img
              className="img-fluid"
              src={`${urlBase}/${order.item.id}.jpg`}
              alt={order.item.name}
            />
          </div>
          <div className="col-sm-10">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 my-1">
                  <h5 className="card-title">Start - {printDate(order.res_date_start)}</h5>
                  <h5 className="card-title">End - {printDate(order.ext_date_end)}</h5>
                  <p className="card-text">{order.item.name}</p>
                  <p className="card-text">{order.item.details.description}</p>
                </div>
                <div className="col-md-4 my-1">
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-success mx-1 my-1"
                      onClick={handleDropoffOnClick}
                      disabled={order.is_dropoff_scheduled}
                    >
                      Book Dropoff
                    </button>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-secondary mx-1 my-1"
                      onClick={handlePickupOnClick}
                      disabled={order.is_pickup_scheduled || !order.is_dropoff_scheduled}
                    >
                      Book Pickup
                    </button>
                  </div>
                  {isActive &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-warning mx-1 my-1"
                        onClick={handleEarlyOnClick}
                        disabled={order.is_pickup_scheduled}
                      >
                        Early Return
                      </button>
                    </div>
                  }
                  {isActive &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-info mx-1 my-1"
                        onClick={handleExtendOnClick}
                      >
                        Extend Rental
                      </button>
                    </div>
                  }
                  {!isActive &&
                    <div className="d-grid gap-2">
                      <Link
                        className="btn btn-lg btn-dark mx-1 my-1"
                        to={`/inventory/i/id=${order.item.id}`}
                      >
                        See Details
                      </Link>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
