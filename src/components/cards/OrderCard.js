import moment from 'moment';
import React from 'react';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';

const OrderCard = ({ urlBase, order, setFlashMessages }) => {
  const history = useHistory();

  let todaysDateStr = moment.utc().format("YYYY-MM-DD");
  let isActive = todaysDateStr < order.ext_date_end;
  let statusOK;

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const handleReceiptOnClick = () => {
    let fileName = `D${todaysDateStr}ID${order.id}P${order.date_placed}.txt`;
    fetch(process.env.REACT_APP_SERVER + `/accounts/o/receipt/id=${order.id}/${fileName}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setFlashMessages(["Sorry, this is a placeholder... receipt download coming soon!"]);
      } else {
        setFlashMessages(["You can only download receipts to your own order."]);
      }
    });
  }

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

  const handleCancelOnClick = () => {
    const userId = Cookies.get('userId');
    const hubbubToken = Cookies.get('hubbubToken');
    if (window.confirm("Are you sure you want to cancel this order?")) {
      fetch(process.env.REACT_APP_SERVER + '/accounts/o/cancel/submit', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          hubbubToken,
          "orderId": order.id
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(isStatusOK)
      .then(data => setFlashMessages(data.flashes));
      history.push(`/accounts/u/id=${order.renter_id}`);
      window.scrollTo(0, 0);
    } else {
      setFlashMessages([`Your order for ${order.item.name} was NOT cancelled.`]);
    }
  }
  return (
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Order Placed</strong></p>
            <p className="text-start my-0"><span>{printDate(order.date_placed)} </span>
              {order.is_extended && <span className="badge bg-success">extended</span>}
            </p>
          </div>
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Charge</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.charge)}</p>
          </div>
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Deposit</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.deposit)}</p>
          </div>
          <div className="col-md-3 my-2">
            {/*
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-dark mx-1 my-1"
                  onClick={handleReceiptOnClick}
                >
                  Download Receipt
                </button>
              </div>
            */}
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
                  {order.is_dropoff_scheduled &&
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
                  }
                  {!order.is_dropoff_scheduled &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-danger mx-1 my-1"
                        onClick={handleCancelOnClick}
                        disabled={order.is_dropoff_scheduled}
                      >
                        Cancel Order
                      </button>
                    </div>
                  }
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
