import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

import { stringToMoment } from '../../helper.js';
import SingleDateInput from '../inputs/SingleDateInput';

const ExtendForm = ({ order, setFlashMessages, setReservation }) => {
  let statusOK;

  const [extendDate, setExtendDate] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    const startDate = stringToMoment(order.ext_date_end).toDate();
    fetch(process.env.REACT_APP_SERVER + `/validate/i/id=${order.item.id}`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        startDate,
        "endDate": extendDate,
        "isDiscounted": true
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setReservation(data.reservation);
        setFlashMessages(["Great, you can extend this item! When you are ready to place your order, select 'Extend Rental'!"]);
      } else {
        let newFlashes = [
          data.flashes[data.flashes.length - 1],
          `Since someone has already booked within the period you provided, it doesn't look like this item can be extended :(`,
          `However, you can start a new rental for the requested it! Just check out the item's details page!`
        ]
        setReservation(null);
        setFlashMessages(newFlashes);
      }

    });
    window.scrollTo(0, 0);
  }
  return (
    <form onSubmit={submit}>
      <div className="row">
        <div className="col-12">
          <SingleDateInput
            setIsValid={setIsValid}
            selectedDay={extendDate}
            handleOnChange={setExtendDate}
            minDateString={order.ext_date_end}
            maxDateString={order.item.calendar.date_ended}
          />
          <div className="d-grid gap-2">
            <input className="btn btn-hubbub" type='submit' value='Check Quote' disabled={!isValid} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ExtendForm;
