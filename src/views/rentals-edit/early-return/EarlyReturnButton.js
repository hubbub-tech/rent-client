import { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlashContext } from '../../../providers/FlashProvider';

import { printDate } from '../../utils.js';

export const EarlyReturnButton = ({ orderId, dtEnded }) => {

  const navigate = useNavigate();

  const [btnClassName, setBtnClassName] = useState("btn btn-hubbub");

  const defaultBtnLabel = 'Return Rental Early';
  const [btnLabel, setBtnLabel] = useState(defaultBtnLabel)

  const { flash, renderFlash } = useContext(FlashContext);

  useEffect(() => {
    if (dtEnded) {
      const dtEndedFormatted = printDate(dtEnded.getTime() / 1000);
      setBtnLabel(`Return on ${dtEndedFormatted}`);
    } else {
      setBtnLabel(defaultBtnLabel);
    }
  }, [dtEnded]);


  function disabled() { return (dtEnded) ? false : true };


  const handleEarlyReturn = (e) => {
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

      const earlyReturnCache = await caches.open('earlyReturnData');

      earlyReturnCache.delete(process.env.REACT_APP_SERVER + '/early-return/success');
      earlyReturnCache.put(process.env.REACT_APP_SERVER + '/early-return/success', response)
      .catch(console.error);
    };

    postData(process.env.REACT_APP_SERVER + '/orders/early-return')
    .then(cacheData)
    .then(() => navigate('/early-return/success'))
    .catch(console.error);
  };

  return (
    <Fragment>
      <div className="d-grid gap-2 mx-2">
        <button
          type="button"
          className={btnClassName}
          onClick={handleEarlyReturn}
          disabled={disabled()}
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
