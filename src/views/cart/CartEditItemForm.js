import { useState, useEffect, useContext } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';

import { useViewport } from '../../hooks/Viewport';
import { FlashContext } from '../../providers/FlashProvider';
import { DateCrossBrowserInput } from '../../inputs/date-single';

export const CartEditItemForm = ({ item, id, isSetEdited }) => {

  const viewport = useViewport();

  const dateToday = new Date();
  const defaultSelected = { from: undefined, to: undefined };
  const [selectedRange, setSelectedRange] = useState(defaultSelected);

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const defaultErrorMessage = undefined;
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const { renderFlash } = useContext(FlashContext);

  const handleEdit = (e) => {
    e.preventDefault();

    if (selectedRange.from === undefined) {
      setErrorMessage("You didn't specify a valid from date.");
      setTimeout(() => setErrorMessage(defaultErrorMessage), 5000);
      return;
    }

    if (selectedRange.to === undefined) {
      setErrorMessage("You didn't specify a valid to date.");
      setTimeout(() => setErrorMessage(defaultErrorMessage), 5000);
      return;
    }

    if (selectedRange.from === selectedRange.to) {
      setErrorMessage("From and to dates must be at least 1 day apart.");
      setTimeout(() => setErrorMessage(defaultErrorMessage), 5000);
      return;
    }

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          itemId: item.id,
          dtStarted: Math.floor(selectedRange.from.getTime() / 1000),
          dtEnded: Math.floor(selectedRange.to.getTime() / 1000),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        isSetEdited(true);
        return true
      } else {
        renderFlash(data.message, "danger", 10000)
        return false;
      }
    };

    postData(process.env.REACT_APP_SERVER + '/cart/edit')
    .catch(console.error);

  };

  const handleFromChange = (value) => {
    setFromValue(value);
    const date = parse(value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange.from, to: selectedRange.to })
    }

    return (selectedRange.to && isAfter(date, selectedRange.to))
      ? setSelectedRange({ from: selectedRange.from, to: selectedRange.to })
      : setSelectedRange({ from: date, to: selectedRange.to });
  }

  const handleToChange = (value) => {
    setToValue(value);
    const date = parse(value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange.from, to: selectedRange.to })
    }

    return (selectedRange.from && isBefore(date, selectedRange.from))
      ? setSelectedRange({ from: selectedRange.from, to: selectedRange.to })
      : setSelectedRange({ from: selectedRange.from, to: date });
  }

  useEffect(() => {
    const dtToday = new Date();
    const dtStarted = new Date(item.calendar.dt_started * 1000);
    setMinDate(dtToday > dtStarted ? dtToday : dtStarted);
    setMaxDate(new Date(item.calendar.dt_ended * 1000));
  }, []);

  return (
    <form onSubmit={handleEdit} id={id}>
      <table className="table table-sm table-borderless mb-1">
        <tbody>
          <tr>
            <th scope="row fw-normal"><small>from</small></th>
            <td className="d-flex justify-content-end">
              <DateCrossBrowserInput
                minDate={minDate}
                maxDate={maxDate}
                setValue={handleFromChange}
                required={true}
              />
            </td>
          </tr>
          <tr>
            <th scope="row fw-normal"><small>to</small></th>
            <td className="d-flex justify-content-end">
              <DateCrossBrowserInput
                minDate={minDate}
                maxDate={maxDate}
                setValue={handleToChange}
                required={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {errorMessage && <small className="text-danger d-flex justify-content-end mb-2">{ errorMessage }</small>}
    </form>
  );
}
