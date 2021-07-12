import moment from 'moment';

import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SingleDateInput from '../inputs/SingleDateInput';

const EarlyForm = ({ order, setFlashMessages }) => {
  let history = useHistory();
  let statusOK;

  let minDateStr = moment.utc().format("YYYY-MM-DD");
  if (minDateStr < order.ext_date_start) {
    minDateStr = order.ext_date_start
  }

  const [earlyDate, setEarlyDate] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + "/accounts/o/early/submit", {
      method: 'POST',
      body: JSON.stringify({ "orderId": order.id, earlyDate }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push(`/accounts/u/id=${order.reservation.renter_id}`)
      }
    });
    window.scrollTo(0, 0);
  }
  return (
    <form onSubmit={submit}>
      <div className="row">
        <div className="col-12">
          <SingleDateInput
            selectedDay={earlyDate}
            handleOnChange={setEarlyDate}
            setIsValid={setIsValid}
            minDateString={minDateStr}
            maxDateString={order.ext_date_end}
          />
          <div className="d-grid gap-2">
            <input className="btn btn-hubbub" type='submit' value='Place Early Return' disabled={!isValid} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EarlyForm;
