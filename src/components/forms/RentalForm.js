import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

import DateRangeInput from '../inputs/DateRangeInput';

const RentalForm = ({ calendar, setFlashMessages, setReservation }) => {
  const [dtStarted, setDtStarted] = useState(null);
  const [dtEnded, setDtEnded] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const isStatusOK = (res) => {
    // some other thing dependent on if res.ok
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault()
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/cart/add`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        itemId: calendar.id,
        dtStarted,
        dtEnded,
        "isDiscounted": false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setReservation(data.reservation);
      setFlashMessages(data.messages);
    });
    window.scrollTo(0, 0);
  }

  return (
    <form onSubmit={submit} >
      <DateRangeInput
        startDate={dtStarted}
        endDate={dtEnded}
        handleStartOnChange={setDtStarted}
        handleEndOnChange={setDtEnded}
        setIsValid={setIsValid}
      />
      <div className="d-grid gap-2 my-3">
        <button className="btn btn-primary" type="submit" disabled={!isValid}>Add to cart (with reservation)</button>
      </div>
    </form>
  );
}


export default RentalForm;
