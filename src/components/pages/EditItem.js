import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { printDate } from '../../helper.js';
import EditItemForm from "../forms/EditItemForm";

const EditItem = ({ setFlashMessages }) => {
  let history = useHistory();
  let statusOK;

  const { itemId } = useParams();
  const [item, setItem] = useState({
    "calendar": {"date_started": null, "date_ended": null},
    "details": {"description": null}
  });

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json()
  }

  useEffect(() => {
    fetch(`/accounts/i/edit/id=${itemId}`)
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        setItem(data.item);
      } else {
        history.push("/");
      }
    })
  }, [itemId]);

  return (
    <main>
      <br />
      <h1 className="text-center">Edit {item.name}</h1>
      <p className="text-center">Listed from {printDate(item.calendar.date_started)} to {printDate(item.calendar.date_ended)}.</p>
      <div className="container-md">
        <div className="row">
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
                  If you are updating the item photo, take a clear, unobstructed photo
                  of your item for the listing with a solid background and good lighting.
                  Portrait photos preferred. These small steps will make it more attractive for customers!
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
      <br />
    </main>
  );
}

export default EditItem;
