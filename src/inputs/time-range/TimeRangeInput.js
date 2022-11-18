import { useState, useEffect } from 'react';

import plusSvg from '../assets/plus.svg';

export const TimeRangeInput = ({ timeRanges, setTimeRanges }) => {

  const defaultTimeRange = { start: undefined, end: undefined };
  const [timeRange, setTimeRange] = useState(defaultTimeRange);

  const defaultBtnClassName = "btn btn-secondary";
  const [btnClassName, setBtnClassName] = useState(defaultBtnClassName);

  const [isDisabled, setIsDisabled] = useState(true);

  const handleStartTime = (e) => setTimeRange({ ...timeRange, start: e.target.value });
  const handleEndTime = (e) => setTimeRange({ ...timeRange, end: e.target.value });

  const handleAppend = () => {
    setTimeRanges([...timeRanges, timeRange]);
    setTimeRange(defaultTimeRange);
  };

  useEffect(() => {
    const isValid = timeRange.start && timeRange.end;

    (isValid)
      ? setBtnClassName("btn btn-success")
      : setBtnClassName(defaultBtnClassName);

    (isValid)
      ? setIsDisabled(timeRange.start >= timeRange.end)
      : setIsDisabled(true);

  }, [timeRange]);


  return (
    <div className="input-group">
      <span className="input-group-text">Add Time</span>
      <input
        type="time"
        aria-label="Start time"
        value={timeRange.start}
        onChange={handleStartTime}
        placeholder="From (ex: 09:00)"
        className="form-control"
      />
      <input
        type="time"
        aria-label="End time"
        value={timeRange.end}
        onChange={handleEndTime}
        placeholder="To (ex: 15:00)"
        className="form-control"
        disabled={!timeRange.start}
      />
      <button
        className={btnClassName}
        onClick={handleAppend}
        type="button"
        disabled={isDisabled}
      >
        <img src={plusSvg} alt="add" />
      </button>
    </div>
  );
}
