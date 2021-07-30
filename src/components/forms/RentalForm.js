import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

import DateRangeInput from '../inputs/DateRangeInput';

const RentalForm = ({ calendar, setFlashMessages, setReservation }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const isStatusOK = (res) => {
    // some other thing dependent on if res.ok
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault()
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/validate/i/id=${calendar.item_id}`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        startDate,
        endDate,
        "isDiscounted": false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setReservation(data.reservation);
      setFlashMessages(data.flashes);
    });
    window.scrollTo(0, 0);
  }

  return (
    <form onSubmit={submit} >
      <DateRangeInput
        startDate={startDate}
        endDate={endDate}
        handleStartOnChange={setStartDate}
        handleEndOnChange={setEndDate}
        setIsValid={setIsValid}
      />
      <div className="d-grid gap-2 my-3">
        <button className="btn btn-primary" type="submit" disabled={!isValid}>Check Quote</button>
      </div>
    </form>
  );
}


export default RentalForm;
