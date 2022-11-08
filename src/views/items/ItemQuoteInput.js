import React from 'react';
import { useState, useEffect } from 'react';

import { printMoney, expDecay } from '../utils.js';

export const ItemQuoteInput = ({ price }) => {
  const [quote, setQuote] = useState(0);
  const [duration, setDuration] = useState(1);

  const handleOnChange = (e) => {
    let getQuote = expDecay(price, e.target.value);
    setDuration(e.target.value);
    setQuote(getQuote);
  }

  useEffect(() => {
    const initQuote = expDecay(price, duration);
    setQuote(initQuote);
  }, []);
  return (
    <div className="row g-1 align-items-center">
      <div className="col-auto my-1">
        <span id="priceEstimateHelpInline">
          <small>{printMoney(quote)} for</small>
        </span>
      </div>
      <div className="col-auto my-1">
        <input
          type="number"
          id="getQuote"
          step="1"
          min="1"
          max="365"
          placeholder={duration}
          className="form-control form-control-sm"
          onChange={handleOnChange}
          aria-describedby="priceEstimateHelpInline"
        />
      </div>
      <div className="col-auto my-1">
        <span>
          <small>day(s)</small>
        </span>
      </div>
    </div>
  );
}
