import React from "react";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import ReviewItemForm from "../forms/ReviewItemForm";

const ReviewItem = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }

  const { orderId } = useParams();
  const [item, setItem] = useState({
    "calendar": {"date_started": null, "date_ended": null},
    "details": {"description": null}
  });
  const [order, setOrder] = useState({
    "reservation": {"date_started": null, "date_ended": null}
  })

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/accounts/o/review/id=${orderId}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        setItem(data.item);
        setOrder(data.order);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      } else if (statusCode === 404) {
        setFlashMessages(data.flashes);
        history.push("/404");
      } else {
        history.push("/");
      }
    })
  }, [orderId]);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Review {item.name}</h1>
          <p className="text-center">Renting from {printDate(order.res_date_start)} to {printDate(order.ext_date_end)}.</p>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <h5 className="text-center">Review Tips</h5>
              <ul className="instructions">
                <li>
                  Tell us about your experience with the {item.name} that you rented! Leave
                  Helpful tips about the items condition or use for Hubbub and future renters.
                </li>
                <br />
                <li>
                  Give your rental a star rating where 1 is very poor, 3 is fair, and 5 is very good.
                  Your honesty helps other renters and helps us improve Hubbub for you :)
                </li>
              </ul>
          </div>
          <div className="col-sm-6">
            <ReviewItemForm item={item} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default ReviewItem;
