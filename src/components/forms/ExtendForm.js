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
    const startDate = stringToMoment(order.ext_dt_end).toDate();
    fetch(process.env.REACT_APP_SERVER + `/orders/extend/validate`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        "orderId": order.id,
        "dtEnded": extendDate,
        "isDiscounted": true
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);
      if (statusOK) {
        setReservation(data.reservation);
      } else {
        setReservation(null);
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
            minDateString={order.ext_dt_end}
            maxDateString={order.item.calendar.dt_ended}
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
