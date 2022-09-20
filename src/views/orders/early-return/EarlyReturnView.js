import { useState } from 'react';

import { EarlyReturnDateInput } from './EarlyReturnDateInput';
import { EarlyReturnButton } from './EarlyReturnButton';
import { useViewport } from '../../../hooks/Viewport';

import { printDate } from '../../items/utils.js';

export const EarlyReturnView = ({ order, setShowEarlyReturnView }) => {

  const viewport = useViewport();

  const dateToday = new Date();
  const [dtEnded, setDtEnded] = useState(null);

  const getMinDate = () => {
    const calDtStarted = Date.parse(order.ext_dt_start);

    if (dateToday > calDtStarted) return dateToday;
    else return calDtStarted;
  };

  const getMaxDate = () => {
    const calDtEnded = Date.parse(order.ext_dt_end);
    return calDtEnded;
  };

  const handleEarlyReturn = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          orderId: order.id,
          dtStarted: order.ext_dt_start,
          dtEnded
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
    };

    let url;
    if (order.res_dt_start === order.ext_dt_start) url = process.env.REACT_APP_SERVER + '/orders/early-return';
    else url = process.env.REACT_APP_SERVER + '/extensions/early-return';

    postData(url)
    .then(() => window.location.reload(false))
    .catch(console.error);
  };

  return (
    <div className="card my-2">
      <h5 className="fs-6 card-header">from { printDate(order.res_dt_start) } to { printDate(order.ext_dt_end) }</h5>
      <div className="card-body mb-0">
        <div className="row mt-2">
          <div className="col-12">
            <h1 className="fs-6 card-title">{order.item_name}</h1>
            <hr />
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <EarlyReturnDateInput
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              defaultMonth={dateToday}
              dtEnded={dtEnded}
              setDtEnded={setDtEnded}
            />
            <div className="col-12 d-grid gap-2 d-flex justify-content-end">
              <button
                type="button"
                onClick={handleEarlyReturn}
                className="btn btn-success btn-sm"
                disabled={dtEnded === null}
              >
                Return Early
              </button>
              <button
                type="button"
                onClick={() => setShowEarlyReturnView(false)}
                className="btn btn-danger btn-sm"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
