import React from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';

import ItemPhoto from '../icons/ItemPhoto';
import ReceiptDownload from '../requests/Receipts';
import { printDate, printMoney } from '../../helper.js';

const OrderCard = ({ urlBase, order, setFlashMessages }) => {
  const history = useHistory();

  let todaysDateStr = moment.utc().format("YYYY-MM-DD");
  let isActive = todaysDateStr < order.ext_dt_end;
  let statusOK;

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const handleReceiptOnClick = () => {
    let fileName = `D${todaysDateStr}ID${order.id}P${order.dt_placed}.txt`;
    fetch(process.env.REACT_APP_SERVER + `/orders/receipt?order_id=${order.id}`, {
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

  const handleItemPhotoOnClick = () => {
    history.push(`/inventory/i/id=${order.item_id}`);
  }

  const handleDropoffOnClick = () => {
    let orderDtDropoff = order.res_dt_start.split(" ").join("T") + "Z"
    history.push(`/schedule/dropoffs/${orderDtDropoff}`);
  }

  const handlePickupOnClick = () => {
    let orderDtPickup = order.ext_dt_end.split(" ").join("T") + "Z"
    history.push(`/schedule/pickups/${orderDtPickup}`);
  }

  const handleEarlyOnClick = () => {
    history.push(`/accounts/o/early/id=${order.id}`);
  }

  const handleExtendOnClick = () => {
    history.push(`/accounts/o/extend/id=${order.id}`);
  }

  const handleReviewOnClick = () => {
    history.push(`/accounts/o/review/id=${order.id}`);
  }

  const handleCancelOnClick = () => {
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    if (window.confirm("Are you sure you want to cancel this order?")) {
      fetch(process.env.REACT_APP_SERVER + `/orders/cancel?order_id=${order.id}`, {
        method: 'POST',
        body: JSON.stringify({
          hubbubId,
          hubbubToken,
          "orderId": order.id
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(isStatusOK)
      .then(data => setFlashMessages(data.messages));

      window.scrollTo(0, 0);
    } else {
      setFlashMessages([`Your order for ${order.item_name} was NOT cancelled.`]);
    }
  }
  return (
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Order Placed</strong></p>
            <p className="text-start my-0"><span>{printDate(order.dt_placed)} </span>
              {order.reservation.is_extension && <span className="badge bg-success">extended</span>}
            </p>
          </div>
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Charge</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.est_charge)}</p>
          </div>
          <div className="col-md-3 my-2">
            <p className="text-start my-0"><strong>Deposit</strong></p>
            <p className="text-start my-0">{printMoney(order.reservation.est_deposit)}</p>
          </div>
          <div className="col-md-3 my-2">
            <div className="d-grid gap-2">
              <ReceiptDownload order={order} setFlashMessages={setFlashMessages} />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-2 my-2">
            <ItemPhoto
              className="img-fluid"
              src={`${urlBase}/${order.item_id}.jpg`}
              onClick={handleItemPhotoOnClick}
              item={{name: order.item_name}}
            />
          </div>
          <div className="col-sm-10">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 my-1">
                  <h5 className="card-title">Start - {printDate(order.res_dt_start)}</h5>
                  <h5 className="card-title">End - {printDate(order.ext_dt_end)}</h5>
                  <p className="card-text">{order.item_name}</p>
                </div>
                <div className="col-md-4 my-1">
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-success mx-1 my-1"
                      onClick={handleDropoffOnClick}
                      disabled={order.dropoff_id != null}
                    >
                      Book Dropoff
                    </button>
                  </div>
                  {(order.dropoff_id != null) &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-secondary mx-1 my-1"
                        onClick={handlePickupOnClick}
                        disabled={order.pickup_id != null}
                      >
                        Book Pickup
                      </button>
                    </div>
                  }
                  {(order.dropoff_id == null) &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-danger mx-1 my-1"
                        onClick={handleCancelOnClick}
                        disabled={order.dropoff_id != null}
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
                        disabled={order.pickup_id != null}
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
                        to={`/inventory/i/id=${order.item_id}`}
                      >
                        See Details
                      </Link>
                    </div>
                  }
                  {(order.dropoff_id !== null) &&
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-hubbub mx-1 my-1"
                        onClick={handleReviewOnClick}
                      >
                        Review Item
                      </button>
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
