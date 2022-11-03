import { useState, useEffect } from 'react';
import { parse, isValid, isBefore, isAfter } from 'date-fns';

export const DateCrossBrowserInput = ({ minDate, maxDate, setValue, required }) => {
  const defaultDateComponents = { year: '', month: '', day: '' };
  const [dateComponents, setDateComponents] = useState(defaultDateComponents);

  useEffect(() => {
    const dateAsString = Object.values(dateComponents).join("-");
    const date = parse(dateAsString, 'y-MM-dd', new Date());

    if (isValid(date)) {
      if (minDate && isBefore(date, minDate)) return;
      if (maxDate && isAfter(date, maxDate)) return;

      setValue(dateAsString);
    }

  }, [dateComponents]);

  return (
    <div className="input-group input-group-sm">
      <input
        type="text"
        size={4}
        placeholder="YYYY"
        value={dateComponents.year}
        onChange={(e) => setDateComponents({...dateComponents, year: e.target.value})}
        aria-label="dateYear"
        className="form-control"
        required={required}
      />
      <input
        type="text"
        size={2}
        placeholder="MM"
        value={dateComponents.month}
        onChange={(e) => setDateComponents({...dateComponents, month: e.target.value})}
        aria-label="dateMonth"
        className="form-control"
        required={required}
      />
      <input
        type="text"
        size={2}
        placeholder="DD"
        value={dateComponents.day}
        onChange={(e) => setDateComponents({...dateComponents, day: e.target.value})}
        aria-label="dateDay"
        className="form-control"
        required={required}
      />
    </div>
  );
}
