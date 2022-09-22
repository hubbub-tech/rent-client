import { useState, useEffect } from 'react';
import { useViewport } from '../../hooks/Viewport';

import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';


export const ExtendDateInput = ({ minDate, maxDate, defaultMonth, dtEnded, setDtEnded }) => {

  const viewport = useViewport();

  const captionStyles = { fontSize: '75%' };
  const footer = dtEnded
    ? <p>You selected {format(dtEnded, 'PP')}.</p>
    : <p>Please pick a day.</p>;

  return (
    <>
      <style>{`
        .rdp {
        --rdp-cell-size: ${viewport.width > 400 ? '48' : '40'}px;
        --rdp-accent-color: #0000ff;
        --rdp-background-color: #e7edff;
        --rdp-accent-color-dark: #3003e1;
        --rdp-background-color-dark: #180270;
        --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
        --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */

        margin: 1em;
      }
      `}</style>
      <DayPicker
        mode="single"
        today={minDate}
        fromDate={minDate}
        toDate={maxDate}
        defaultMonth={defaultMonth}
        selected={dtEnded}
        onSelect={setDtEnded}
        footer={footer}
        styles={{ caption: captionStyles }}
      />
    </>
  );
}
