import { Fragment, useState } from 'react';
import { format, parse, isValid } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import { DateSingleInputBase } from './DateSingleInput';
import { DateSinglePickerStyle } from './DateSinglePickerStyle';

import 'react-day-picker/dist/style.css';

export const DateSinglePicker = ({ minDate, maxDate, defaultMonth, selectedDate, setSelectedDate }) => {

  const [dateFormatted, setDateFormatted] = useState('');

  const captionStyles = { fontSize: '75%' };

  const handleDateChange = (e) => {
    setDateFormatted(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    (isValid(date)) ? setSelectedDate(date) : setSelectedDate(undefined);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    (date)
      ? setDateFormatted(format(date, 'y-MM-dd'))
      : setDateFormatted('');
  }

  return (
    <Fragment>
      <DateSinglePickerStyle />
      <DayPicker
        mode="single"
        today={minDate}
        fromDate={minDate}
        toDate={maxDate}
        defaultMonth={defaultMonth}
        selected={selectedDate}
        onSelect={handleDateSelect}
        footer={
          <DateSingleInputBase
            value={dateFormatted}
            handleValueChange={handleDateChange}
          />
        }
        styles={{ caption: captionStyles }}
      />
    </Fragment>
  );
}
