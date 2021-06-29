import React from 'react';
import { useEffect } from 'react';

import { printMoney } from '../../helper.js'
import CheckoutForm from '../forms/CheckoutForm';

const PricingCard = ({cart, isReady, toggle, setToggle, setFlashMessages}) => {
  useEffect(() => setToggle(!toggle), []);
  return (
    <div className="card">
      <div className="card-body">
        <p className="text-start fs-5 fw-bold mb-3">Pricing</p>
        {isReady && <p className="text-start"><span className="badge bg-dark">Order Cost</span> ${ printMoney(cart.total) }</p>}
        {isReady && <p className="text-start"><span className="badge bg-dark">Deposit</span> ${ printMoney(cart.total_deposit) }</p>}
        {isReady && <p className="text-start"><span className="badge bg-dark">Tax</span> ${ printMoney(cart.total_tax) }</p>}
        {isReady &&
          <small className="card-text text-alert">
            Note: the deposit will be returned at the end of your rental.*
          </small>
        }
        {isReady && <hr/>}
        {isReady && <p className="text-start"><span className="badge bg-dark">Total</span> ${ printMoney(cart.total + cart.total_deposit + cart.total_tax) }</p>}
        <hr/>
        {isReady && <CheckoutForm setFlashMessages={setFlashMessages} />}
        {!isReady && <p>Set reservations on all your items before paying.</p>}
      </div>
    </div>
  );
}

export default PricingCard;
