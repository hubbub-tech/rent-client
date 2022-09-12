import { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';


const css = `
  .rdp {
  --rdp-cell-size: 50px;
  --rdp-accent-color: #0000ff;
  --rdp-background-color: #e7edff;
  --rdp-accent-color-dark: #3003e1;
  --rdp-background-color-dark: #180270;
  --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
  --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */

  margin: 1em;
}
`;

export const DetailsReservationInput = ({ minDate, maxDate, defaultMonth, dtRange, setDtRange }) => {

  let footer = <p>Please pick the first day.</p>;

  if (dtRange.from) {
    if (!dtRange.to) {
      footer = <p>{format(dtRange.from, 'PP')}</p>;
    } else if (dtRange.to) {
      footer = (
        <p>
          {format(dtRange.from, 'PP')}–{format(dtRange.to, 'PP')}
        </p>
      );
    }
  }

  const onSelectChangeRange = (e) => {
    if (e !== undefined) setDtRange({ from: e.from, to: e.to });
    else setDtRange({ from: null, to: null });

    console.log(dtRange);
}
  return (
    <>
      <style>{css}</style>
      <DayPicker
        mode="range"
        min={2}
        max={364}
        today={new Date()}
        fromDate={minDate}
        toDate={maxDate}
        defaultMonth={defaultMonth}
        selected={dtRange}
        footer={footer}
        onSelect={onSelectChangeRange}
      />
    </>
  );
}
