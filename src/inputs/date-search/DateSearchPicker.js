import { Fragment, useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';

import { useViewport } from '../../hooks/Viewport.js';

import { DateSearchPickerStyle } from './DateSearchPickerStyle';

export const DateSearchPicker = ({
  minDate = null,
  maxDate = null,
  defaultMonth = new Date(),
  selectedRange,
  handleRangeSelect
}) => {

  const viewport = useViewport();
  const captionStyles = { fontSize: '75%' };
  const [monthsDisplayed, setMonthsDisplayed] = useState(1);

  useEffect(() => {
    (viewport.width < 900)
      ? setMonthsDisplayed(1)
      : setMonthsDisplayed(2);
  }, [viewport.width]);

  return (
    <Fragment>
      <DateSearchPickerStyle />
      <DayPicker
        mode="range"
        min={1}
        max={364}
        fromDate={minDate}
        toDate={maxDate}
        numberOfMonths={monthsDisplayed}
        defaultMonth={defaultMonth}
        selected={selectedRange}
        onSelect={handleRangeSelect}
        styles={{ caption: captionStyles }}
      />
    </Fragment>
  );
}
