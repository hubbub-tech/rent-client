import { useState, useEffect } from 'react';

import plusSvg from '../assets/plus.svg';


export const TimeRangeMenuInput = ({ timeRanges, setTimeRanges }) => {

  const defaultTimeRange = { start: undefined, end: undefined };
  const [selectedTimeRange, setSelectedTimeRange] = useState(defaultTimeRange);

  const [menuLabel, setMenuLabel] = useState("Select a time range");

  const presetTimeRanges = [
    { start: "8:00", end: "8:30" }, { start: "8:30", end: "9:00" },

    { start: "9:00", end: "9:30" }, { start: "9:30", end: "10:00" },

    { start: "10:00", end: "10:30" }, { start: "10:30", end: "11:00" },

    { start: "11:00", end: "11:30" }, { start: "11:30", end: "12:00" },

    { start: "12:00", end: "12:30" }, { start: "12:30", end: "13:00" },

    { start: "13:00", end: "13:30" }, { start: "13:30", end: "14:00" },

    { start: "14:00", end: "14:30" }, { start: "14:30", end: "15:00" },

    { start: "15:00", end: "15:30" }, { start: "15:30", end: "16:00" },

    { start: "16:00", end: "16:30" }, { start: "16:30", end: "17:00" },

    { start: "17:00", end: "17:30" }, { start: "17:30", end: "18:00" },

    { start: "18:00", end: "18:30" }, { start: "18:30", end: "19:00" },

    { start: "19:00", end: "19:30" }, { start: "19:30", end: "20:00" },

    { start: "20:00", end: "20:30" }, { start: "20:30", end: "21:00" }
  ];

  const handleSelectTimeRange = (e) => {

    const timeRangeArray = e.target.value.split(" - ");
    const timeRangeObject = { start: timeRangeArray[0], end: timeRangeArray[1] };
    setSelectedTimeRange(timeRangeObject);

    const isFound = timeRanges.some(timeRange => {
      return (timeRange.start === timeRangeObject.start);
    })

    if (!isFound) setTimeRanges([...timeRanges, timeRangeObject]);
    setMenuLabel(e.target.value);
  };

  return (
    <div className="input-group">
      <select
        className="form-select"
        aria-label="Select a time range"
        onChange={handleSelectTimeRange}
        value={menuLabel}
      >
      {presetTimeRanges.map((timeRange, index) => (
        <option value={`${timeRange.start} - ${timeRange.end}`} key={timeRange.start}>
          {`${timeRange.start} - ${timeRange.end}`}
        </option>
      ))}
      </select>
    </div>
  );
}



export const TimeRangeTextInput = ({ timeRanges, setTimeRanges }) => {

  const defaultTimeRange = { start: undefined, end: undefined };
  const [selectedTimeRange, setSelectedTimeRange] = useState(defaultTimeRange);

  const defaultBtnClassName = "btn btn-secondary";
  const [btnClassName, setBtnClassName] = useState(defaultBtnClassName);

  const [isDisabled, setIsDisabled] = useState(true);

  const handleStartTime = (e) => setSelectedTimeRange({ ...selectedTimeRange, start: e.target.value });
  const handleEndTime = (e) => setSelectedTimeRange({ ...selectedTimeRange, end: e.target.value });

  const handleAppend = () => {
    setTimeRanges([...timeRanges, selectedTimeRange]);
    setSelectedTimeRange(defaultTimeRange);
  };

  useEffect(() => {
    const isValid = selectedTimeRange.start && selectedTimeRange.end;

    (isValid)
      ? setBtnClassName("btn btn-success")
      : setBtnClassName(defaultBtnClassName);

    (isValid)
      ? setIsDisabled(selectedTimeRange.start >= selectedTimeRange.end)
      : setIsDisabled(true);

  }, [selectedTimeRange]);


  return (
    <div className="input-group">
      <span className="input-group-text">Add Time</span>
      <input
        type="time"
        aria-label="Start time"
        value={selectedTimeRange.start}
        onChange={handleStartTime}
        placeholder="From (ex: 09:00)"
        className="form-control"
      />
      <input
        type="time"
        aria-label="End time"
        value={selectedTimeRange.end}
        onChange={handleEndTime}
        placeholder="To (ex: 15:00)"
        className="form-control"
        disabled={!selectedTimeRange.start}
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
