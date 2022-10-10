import { useViewport } from '../../hooks/Viewport';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

export const ListCalendarInput = ({ minDate, maxDate, defaultMonth, dtRange, setDtRange }) => {

  const viewport = useViewport();
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
      <style>{`
        .rdp {
        --rdp-cell-size: ${viewport.width > 800 ? '50' : '44'}px;
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
        mode="range"
        min={1}
        today={new Date()}
        fromDate={minDate}
        toDate={maxDate}
        defaultMonth={defaultMonth}
        selected={dtRange}
        footer={footer}
        onSelect={onSelectChangeRange}
        styles={{
          caption: { fontSize: '75%'}
        }}
      />
    </>
  );
}
