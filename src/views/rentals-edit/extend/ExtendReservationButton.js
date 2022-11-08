import { Fragment, useState, useEffect, useContext } from 'react';

import { FlashContext } from '../../../providers/FlashProvider';

import { printDate } from '../../utils.js';

export const ExtendReservationButton = ({ orderId, dtEnded }) => {

  const [btnClassName, setBtnClassName] = useState("btn btn-hubbub");

  const defaultBtnLabel = 'Extend Reservation';
  const [btnLabel, setBtnLabel] = useState(defaultBtnLabel);
  const [isDisabled, setIsDisabled] = useState(true);

  const { flash, renderFlash } = useContext(FlashContext);

  useEffect(() => {
    if (dtEnded) {
      const dtEndedFormatted = printDate(dtEnded.getTime() / 1000);
      setBtnLabel(`Extend to ${dtEndedFormatted}`);
      setIsDisabled(false);
    } else {
      setBtnLabel(defaultBtnLabel);
      setIsDisabled(true);
    }
  }, [dtEnded]);


  const handleExtend = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          orderId,
          dtEnded: Math.floor(dtEnded.getTime() / 1000)
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      return response;
    };

    const cacheData = async(response) => {
      const responseClone = response.clone();
      const data = await responseClone.json();

      if (response.ok) {
        const tryRedirect = () =>  window.location.href = data.redirect_url;
        const extensionCache = await caches.open('extensionData');

        extensionCache.delete(process.env.REACT_APP_SERVER + '/extend/success');
        extensionCache.put(process.env.REACT_APP_SERVER + '/extend/success', response)
        .then(tryRedirect)
        .catch(console.error);
      } else {
        renderFlash(data.message, 'danger', 10000)
      }
    };

    postData(process.env.REACT_APP_SERVER + '/orders/extend/validate')
    .then(cacheData)
    .catch(console.error);
  };

  return (
    <Fragment>
      <div className="d-grid gap-2 mx-2">
        <button
          type="button"
          className={btnClassName}
          onClick={handleExtend}
          disabled={isDisabled}
        >
          {btnLabel}
        </button>
      </div>
      {(flash.message) &&
        <p id="reservationHelp" className="text-muted mx-2 my-1">
          { flash.message }
        </p>
      }
    </Fragment>
  );
}
