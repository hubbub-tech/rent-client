import React from 'react';
import { useState } from 'react';

import { printMoney, expDecay } from '../../helper.js';

const QuoteInput = ({ price }) => {
  const [quote, setQuote] = useState(0);
  const [duration, setDuration] = useState(0);
  const handleOnChange = (e) => {
    let getQuote = expDecay(price, e.target.value);
    setDuration(e.target.value);
    setQuote(getQuote);
  }
  return (
    <div className="row g-1 align-items-center">
      <div className="col-auto my-2">
        <span id="priceEstimateHelpInline">{printMoney(quote)} estimate for</span>
      </div>
      <div className="col-auto my-2">
        <input
          type="number"
          id="getQuote"
          step="1"
          min="1"
          max="365"
          placeholder="0"
          className="form-control form-control-sm"
          onChange={handleOnChange}
          aria-describedby="priceEstimateHelpInline"
        />
      </div>
      <div className="col-auto my-2">
        <span>days</span>
      </div>
    </div>
  );
}

export default QuoteInput;
