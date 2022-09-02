import React from 'react';
import { useState, useEffect } from 'react';

import FormErrors from '../errors/FormErrors'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

const TimeRangeInput = ({
  start,
  end,
  handleStartOnChange,
  handleEndOnChange,
  setIsValid
}) => {
  const [errors, setErrors] = useState([])
  useEffect(() => {
    if (!start || !end) {
      setIsValid(false);
    } else if (start > end) {
      setIsValid(false);
      setErrors(["Your start time can't be after your end time."])
    } else {
      setIsValid(true);
      setErrors([])
    }
  },[start, end]);
  return (
    <div className="row my-3">
      <input
        type="datetime-local"
        id="startTime"
        name="startTime"
        min="09:00"
        max="18:00"
        onChange={handleStartOnChange}
        required
      />
      <p className="text-center mt-1 mb-0">to</p>
      <input
        type="datetime-local"
        id="endTime"
        name="endTime"
        min="09:00"
        max="18:00"
        onChange={handleEndOnChange}
        required
      />
      <FormErrors errors={errors} color={"red"} />
    </div>
  );
}

export default TimeRangeInput;
