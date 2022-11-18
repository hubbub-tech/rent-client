import { Fragment, useState } from 'react';

import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import { DateRangeInputBase } from './DateRangeInput';
import { DateRangePickerStyle } from './DateRangePickerStyle';

import 'react-day-picker/dist/style.css';

export const DateRangePicker = ({ minDate, maxDate, defaultMonth, selectedRange, setSelectedRange }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const captionStyles = { fontSize: '75%' };

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

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range) {
      (range.from)
        ? setFromValue(format(range.from, 'y-MM-dd'))
        : setFromValue('');

      (range.to)
        ? setToValue(format(range.to, 'y-MM-dd'))
        : setToValue('');
    }
  };

  return (
    <Fragment>
      <DateRangePickerStyle />
      <DayPicker
        mode="range"
        min={1}
        max={364}
        fromDate={minDate}
        toDate={maxDate}
        defaultMonth={defaultMonth}
        selected={selectedRange}
        onSelect={handleRangeSelect}
        footer={
          <DateRangeInputBase
            fromValue={fromValue}
            handleFromChange={handleFromChange}
            toValue={toValue}
            handleToChange={handleToChange}
          />
        }
        styles={{ caption: captionStyles }}
      />
    </Fragment>
  );
}
