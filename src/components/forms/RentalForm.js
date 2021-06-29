import React from 'react';
import { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import '../../dates.css';

const RentalForm = ({calendar, setFlashMessages, setReservation}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleOnDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const isStatusOK = (res) => {
    // some other thing dependent on if res.ok
    return res.json()
  }

  const submit = (e) => {
    e.preventDefault()
    fetch(`/validate/i/id=${calendar.item_id}`, {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
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
      <DateRangePicker
        startDate={startDate}
        startDateId="rental-start-date"
        endDate={endDate}
        endDateId="rental-end-date"
        onDatesChange={handleOnDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        orientation='vertical'
        required={true} />
      <div className="d-grid gap-2 my-3">
        <button className="btn btn-primary" type="submit">Check Quote</button>
      </div>
    </form>
  );
}

export default RentalForm;
