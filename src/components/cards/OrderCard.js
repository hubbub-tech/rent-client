import React from 'react';
import { useHistory } from 'react-router-dom';

const OrderCard = ({ urlBase, order }) => {
  let history = useHistory();

  const handleDropoffOnClick = () => {
    history.push(`/schedule/dropoffs/${order.res_date_start}`)
  }

  const handlePickupOnClick = () => {
    history.push(`/schedule/pickups/${order.res_date_end}`)
  }

  return (
    <div className="card px-0 mb-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Order Placed</strong></p>
            <p className="text-start my-0">{order.date_placed}</p>
          </div>
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Charge</strong></p>
            <p className="text-start my-0">${order.reservation.charge}</p>
          </div>
          <div className="col-md-4 my-2">
            <p className="text-start my-0"><strong>Deposit</strong></p>
            <p className="text-start my-0">${order.reservation.deposit} {order.is_extended ? '(extended)' : ''}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-2 my-2">
            <img
              className="img-fluid"
              src={`${urlBase}/${order.item.id}.jpg`}
              alt={order.item.name} />
          </div>
          <div className="col-sm-10">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 my-1">
                  <h5 className="card-title">Start - {order.res_date_start}</h5>
                  <h5 className="card-title">End - {order.ext_date_end}</h5>
                  <p className="card-text">{order.item.name}</p>
                  <p className="card-text">{order.item.details.description}</p>
                </div>
                <div className="col-md-4 my-1">
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-success mx-1 my-1"
                      onClick={handleDropoffOnClick}
                      disabled={order.is_dropoff_scheduled}>
                      Book Dropoff
                    </button>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-secondary mx-1 my-1"
                      onClick={handlePickupOnClick}
                      disabled={order.is_pickup_scheduled}>
                      Book Pickup
                    </button>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-warning mx-1 my-1"
                      disabled={order.is_pickup_scheduled}>
                      Early Return
                    </button>
                  </div>
                  <div className="d-grid gap-2">
                    {true && // if rental is still active
                      <button
                        type="button"
                        className="btn btn-lg btn-info mx-1 my-1"
                        disabled={order.is_pickup_scheduled}>
                        Extend Rental
                      </button>
                    }
                    {false && // if rental is not active
                      <button
                        type="button"
                        className="btn btn-lg btn-info mx-1 my-1">
                        Order Again
                      </button>
                    }
                  </div>
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
