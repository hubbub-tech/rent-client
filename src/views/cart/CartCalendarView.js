import { useState, useEffect, useContext } from 'react';

import { CartReservationInput } from './CartReservationInput';
import { CartEditItemButton } from './CartEditItemButton';
import { useViewport } from '../../hooks/Viewport';

import { FlashContext } from '../../providers/FlashProvider';

export const CartCalendarView = ({ item }) => {

  const viewport = useViewport();

  const dateToday = new Date();
  const defaultSelected = { from: null, to: null };
  const [dtRange, setDtRange] = useState(defaultSelected);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const { addFlash, removeFlash } = useContext(FlashContext);

  useEffect(() => {

    const dtToday = new Date();
    const dtStarted = new Date(item.calendar.dt_started * 1000);

    setMinDate(dtToday > dtStarted ? dtToday : dtStarted);
    setMaxDate(new Date(item.calendar.dt_ended * 1000));

  }, [item]);

  const handleEdit = (e) => {
    e.preventDefault();

    const renderFlash = async(message, status, timeout = 1000) => {
      addFlash({ message, status });
      setTimeout(() => removeFlash(), timeout);
    }

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          itemId: item.id,
          dtStarted: Math.floor(dtRange.from.getTime() / 1000),
          dtEnded: Math.floor(dtRange.to.getTime() / 1000),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        renderFlash(data.message, "danger", 5000)
        return false;
      }
    };

    postData(process.env.REACT_APP_SERVER + '/cart/edit')
    .then(isOk => isOk && window.location.reload(false))
    .catch(console.error);
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-8 col-12">
        <CartReservationInput
          minDate={minDate}
          maxDate={maxDate}
          defaultMonth={dateToday}
          dtRange={dtRange}
          setDtRange={setDtRange}
        />
        <CartEditItemButton
          onClick={handleEdit}
          disabled={(dtRange.from == null || dtRange.to == null)}
        />
      </div>
      {viewport.width > 500 &&
        <div className="col-lg-6 col-md-4 col-12">
          <h2 className="mt-4 me-2 fs-5">Item Description</h2>
          <p className="mt-4 me-2">{ item.description }</p>
        </div>
      }
    </div>
  );
}
