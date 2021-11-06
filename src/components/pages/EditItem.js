import React from "react";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import EditItemForm from "../forms/EditItemForm";

const EditItem = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }

  const { itemId } = useParams();
  const [item, setItem] = useState({
    "calendar": {"date_started": null, "date_ended": null},
    "details": {"description": null}
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/accounts/i/edit/id=${itemId}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        setItem(data.item);
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
  }, [itemId]);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Edit {item.name}</h1>
          <p className="text-center">Listed from {printDate(item.calendar.date_started)} to {printDate(item.calendar.date_ended)}.</p>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <h5 className="text-center">Quick Tips</h5>
              <ul className="instructions">
                <li>
                  Be sure to set your item at its original retail price. This helps us
                  set the most precise listing value for your item.
                </li>
                <br />
                <li>
                  If you are updating the item description, provide a good description
                  for your item. This is an opportunity to capture details that maybe
                  don't come through in the photo. It is probably best to keep it tweet length.
                </li>
                <br />
                <li>
                  Photos must be formatted as <mark><i>.jpg, .png, or .jpeg</i></mark> to be accepted.
                </li>
              </ul>
          </div>
          <div className="col-sm-6">
            <EditItemForm item={item} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default EditItem;
