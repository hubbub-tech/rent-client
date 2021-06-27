import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import '../../dates.css';

const SingleDateForm = ({calendar, fixedDate, setFlashMessages, setReservation}) => {
  const [singleDate, setSingleDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(true);

  const handleOnDateChange = ({ singleDate }) => {
    setSingleDate(singleDate);
  };

  const isStatusOK = (res) => {
    // some other thing dependent on if res.ok
    return res.json()
  }

  const submit = (e) => {
    e.preventDefault()
    let startDate = moment(fixedDate).format('DD-MM-YYYY');
    fetch(`/validate/i/id=${calendar.item_id}`, {
      method: 'POST',
      body: JSON.stringify({ "startDate": startDate, "endDate": singleDate }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setReservation(data.reservation);
      setFlashMessages(data.flashes);
    });
  }

  return (
    <form onSubmit={submit} >
      <SingleDatePicker
        date={singleDate}
        onDateChange={handleOnDateChange}
        focused={focusedInput}
        onFocusChange={({focusedInput}) => setFocusedInput(focusedInput)}
        orientation='vertical'
        id="single-date-picker"
        required={true}
      />
      <div className="d-grid gap-2 my-3">
        <button className="btn btn-primary" type="submit">Check Date</button>
      </div>
    </form>
  );
}

export default SingleDateForm;
