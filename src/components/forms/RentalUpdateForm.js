import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

import DateRangeInput from '../inputs/DateRangeInput';

const RentalUpdateForm = ({ calendar, toggle, setToggle, setFlashMessages }) => {
  const [newDtStarted, setNewDtStarted] = useState(null);
  const [newDtEnded, setNewDtEnded] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const submit = (e) => {
    e.preventDefault()
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/cart/edit`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        itemId: calendar.id,
        newDtStarted,
        newDtEnded
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      setFlashMessages(data.messages);
      setToggle(!toggle);
    });
    window.scrollTo(0, 0);
  }
  return (
    <form onSubmit={submit} >
      <DateRangeInput
        startDate={newDtStarted}
        endDate={newDtEnded}
        handleStartOnChange={setNewDtStarted}
        handleEndOnChange={setNewDtEnded}
        setIsValid={setIsValid}
      />
      <div className="d-grid gap-2 my-3">
        <button className="btn btn-primary" type="submit" disabled={!isValid}>Update Rental Period</button>
      </div>
    </form>
  );
}

export default RentalUpdateForm;
