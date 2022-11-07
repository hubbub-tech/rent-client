import { useState } from 'react';

export const DeliveryTimeInput = ({ timeslots, setTimeslots }) => {

  const defaultTimeRange = { start: null, end: null };
  const [timeRange, setTimeRange] = useState(defaultTimeRange);
  const [btnClassName, setBtnClassName] = useState("btn btn-outline-success")

  const handleStartTime = (e) => setTimeRange({ ...timeRange, start: e.target.value });
  const handleEndTime = (e) => setTimeRange({ ...timeRange, end: e.target.value });

  const handleAppend = (e) => {
    setTimeslots([...timeslots, timeRange]);
    setTimeRange(defaultTimeRange);
  };

  const disabled = () => {
    const isValid = timeRange.start && timeRange.end;

    (isValid)
      ? setBtnClassName("btn btn-success")
      : setBtnClassName("btn btn-outline-success");

    if (isValid) {
      const isValidRange = timeRange.start < timeRange.end;
      return !isValidRange;
    }

    return true;
  };

  return (
    <div className="input-group">
      <span className="input-group-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-clock"
          viewBox="0 0 16 16"
        >
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
        </svg>
      </span>
      <input
        type="time"
        step="1800"
        aria-label="Start time"
        onChange={handleStartTime}
        placeholder="From (ex: 09:00)"
        className="form-control"
      />
      <input
        type="time"
        step="1800"
        aria-label="End time"
        onChange={handleEndTime}
        placeholder="To (ex: 11:00)"
        className="form-control"
        disabled={timeRange.start === null}
      />
      <button
        className={btnClassName}
        onClick={handleAppend}
        type="button"
        disabled={disabled()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
  );
}
