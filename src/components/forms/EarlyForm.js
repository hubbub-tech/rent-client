import moment from 'moment';

import React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNagivate } from 'react-router-dom';

import SingleDateInput from '../inputs/SingleDateInput';

const EarlyForm = ({ order, setFlashMessages }) => {
  const history = useNagivate();
  let statusOK;

  let minDateStr = moment.utc().format("YYYY-MM-DD");
  if (minDateStr < order.ext_dt_start) {
    minDateStr = order.ext_dt_start
  }

  const [earlyDate, setEarlyDate] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    if (window.confirm("Are you sure you want to early return this order? This is different from scheduling a pickup.")) {
      fetch(process.env.REACT_APP_SERVER + "/orders/early-return", {
        method: 'POST',
        body: JSON.stringify({
          hubbubId,
          hubbubToken,
          dtEnded: earlyDate,
          orderId: order.id
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(isStatusOK)
      .then(data => {
        setFlashMessages(data.messages);
        if (statusOK) {
          history.push(`/accounts/u/id=${order.reservation.renter_id}`)
        }
      });
      window.scrollTo(0, 0);
    } else {
      setFlashMessages(["Your rental was NOT early returned."]);
    }
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
