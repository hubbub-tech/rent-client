import { useState, useEffect } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';

export const DateRangeInputBase = ({ fromValue, handleFromChange, toValue, handleToChange }) => {
  return (
    <div className="input-group input-group-sm">
      <span className="input-group-text">From</span>
      <input
        size={10}
        placeholder="YYYY-MM-DD"
        value={fromValue}
        onChange={handleFromChange}
        className="form-control"
      />
      <span className="input-group-text">To</span>
      <input
        size={10}
        placeholder="YYYY-MM-DD"
        value={toValue}
        onChange={handleToChange}
        className="form-control"
      />
    </div>
  );
}


export const DateRangeInput = ({ minDate, maxDate, defaultMonth, selectedRange, setSelectedRange }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange.to });
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange.from, to: undefined });
    }
    if (selectedRange.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange.from, to: date });
    }
  };

  return (
    <DateRangeInputBase
      fromValue={fromValue}
      handleFromChange={handleFromChange}
      toValue={toValue}
      handleToChange={handleToChange}
    />
  );
}
