import { useState, useEffect } from 'react';

import { printDate, printMoney, expDecay } from '../../utils.js';

export const ExtendCostMessage = ({ order, dtEnded }) => {

  const [extendCost, setExtendCost] = useState(undefined);

  useEffect(() => {
    let dtStarted = new Date(order.ext_dt_end * 1000);

    if (dtEnded) {
      let duration = dtEnded.getTime() - dtStarted.getTime();
      let daysDuration = duration / (1000 * 3600 * 24);

      let getQuote = expDecay(order.item.retail_price, daysDuration);

      setExtendCost(getQuote);
    } else {
      setExtendCost(undefined);
    }
  }, [dtEnded]);

  return (extendCost)
    ? <span className="fw-bold text-dark">
        Extend for: <span className="text-success">{ printMoney(extendCost) }</span>
      </span>
    : <span className="fw-bold text-dark">Extend your rental</span>;
}
