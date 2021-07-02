import React from 'react';
import { useState, useEffect } from 'react';

import FormErrors from '../errors/FormErrors'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

const DateRangeInput = ({
  startDate,
  endDate,
  handleStartOnChange,
  handleEndOnChange,
  setIsValid
}) => {
  const [errors, setErrors] = useState([])
  useEffect(() => {
    if (!startDate || !endDate) {
      setIsValid(false);
    } else if (startDate > endDate) {
      setIsValid(false);
      setErrors(["Your start date can't be after your end date."])
    } else if (startDate.getTime() === endDate.getTime()) {
      setIsValid(false);
      setErrors(["Your rental must be at least one full day."])
    } else {
      setIsValid(true);
      setErrors([])
    }
  },[startDate, endDate]);
  return (
    <div className="row my-3">
      <p className="text-center mb-0">from</p>
      <DayPickerInput
        classNames={{container: "col-12 my-1 text-center"}}
        onDayChange={handleStartOnChange}
        selectedDays={startDate}
        placeholder="MM/DD/YYYY"
        formatDate={formatDate}
        parseDate={parseDate}
      />
      <p className="text-center mt-1 mb-0">to</p>
      <DayPickerInput
        classNames={{container: "col-12 mt-1 mb-3 text-center"}}
        onDayChange={handleEndOnChange}
        selectedDays={endDate}
        placeholder="MM/DD/YYYY"
        formatDate={formatDate}
        parseDate={parseDate}
      />
      <FormErrors errors={errors} color={"red"} />
    </div>
  );
}

export default DateRangeInput;
