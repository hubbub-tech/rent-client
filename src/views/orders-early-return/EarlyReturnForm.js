import { useState } from 'react';

import { EarlyReturnDateInput } from './EarlyReturnDateInput';

export const EarlyReturnForm = ({ order }) => {

  const [dtEnded, setDtEnded] = useState(null);

  const dateToday = new Date();
  const getMinDate = () => {
    const calDtStarted = new Date(order.res_dt_start * 1000);

    if (dateToday > calDtStarted) return dateToday;
    else return calDtStarted;
  };

  const getMaxDate = () => {
    const calDtEnded = new Date(order.ext_dt_end * 1000);
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
          dtEnded: Math.floor(dtEnded.getTime() / 1000)
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
    };

    postData(process.env.REACT_APP_SERVER + '/orders/early-return')
    .catch(console.error);
  };


  return (
    <form onSubmit={handleEarlyReturn}>
      <div className="col-md-12 mb-4">
        <EarlyReturnDateInput
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          defaultMonth={dateToday}
          dtEnded={dtEnded}
          setDtEnded={setDtEnded}
        />
        <div className="col-12 d-grid gap-2 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success btn-sm"
            disabled={dtEnded === null}
          >
            Return Early
          </button>
        </div>
      </div>
    </form>
  );
}
