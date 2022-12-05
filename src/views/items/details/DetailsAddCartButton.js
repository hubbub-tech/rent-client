import { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import shoppingSvg from '../assets/shopping.svg';

import { FlashContext } from '../../../providers/FlashProvider';


export const DetailsAddCartButton = ({ itemId, setRentalCost, dtRange }) => {

  const navigate = useNavigate();
  
  const [btnClassName, setBtnClassName] = useState("btn btn-hubbub");
  const [btnLabel, setBtnLabel] = useState("Add to cart")

  const [dtStarted, setDtStarted] = useState(null);
  const [dtEnded, setDtEnded] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const { flash, renderFlash } = useContext(FlashContext);

  useEffect(() => {
    if (dtRange === undefined) {
      setDtStarted(null);
      setDtEnded(null);
    } else {
      setDtStarted(dtRange.from);
      setDtEnded(dtRange.to);
    }
  }, [dtRange]);


  useEffect(() => {
    if (dtStarted && dtEnded) {
      let timeElapsed = dtEnded.getTime() - dtStarted.getTime();
      let daysElapsed = timeElapsed / (1000 * 3600 * 24);

      setIsDisabled(daysElapsed < process.env.REACT_APP_MIN_RESERVATION);
    } else {
      setIsDisabled(false);
    }
  }, [dtStarted, dtEnded]);


  const handleAddItem = () => {

    const postData = async(url, pkg) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(pkg),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);

      if (response.ok) {
        setBtnClassName('btn btn-success');
        setBtnLabel('Added!');
      } else if (response.status === 403) {
        navigate(`/login?redirect=${window.location.pathname + window.location.search}`);
      } else {
        setBtnClassName('btn btn-danger');
        setBtnLabel('Unavailable');

        setTimeout(() => {
          setBtnClassName('btn btn-hubbub');
          setBtnLabel('Add to cart');
        }, 5000)
      }

      setRentalCost(data.est_charge);
    };

    let pkg;
    let url;
    if (dtStarted && dtEnded) {
      pkg = {
        itemId,
        dtStarted: Math.floor( dtStarted.getTime() / 1000),
        dtEnded: Math.floor( dtEnded.getTime() / 1000)
      };
      url = '/cart/add';
    } else {
      pkg = { itemId };
      url = '/cart/add/no-reservation';
    };

    postData(process.env.REACT_APP_SERVER + url, pkg)
    .catch(console.error);
  };

  return (
    <Fragment>
      <div className="d-grid gap-2 mx-2">
        <button
          type="button"
          className={btnClassName}
          onClick={handleAddItem}
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
