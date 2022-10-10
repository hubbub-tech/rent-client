import { useState, useEffect } from 'react';

import { CartCheckoutButton } from './CartCheckoutButton';
import { CartTxnMethodRadio } from './CartTxnMethodRadio';

import { printMoney } from '../utils.js';

export const CartCheckout = ({ cart, unreservedItems, reservedItems }) => {

  const [isReady, setIsReady] = useState(false);
  const [txnMethod, setTxnMethod] = useState('in-person');

  useEffect(() => {
    setIsReady(unreservedItems.length === 0 && reservedItems.length > 0);
  }, [unreservedItems, reservedItems]);

  useEffect(() => {
    console.log(txnMethod);
  }, [txnMethod]);

  if (isReady) return (
    <div className="card">
      <div className="card-body">
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th scope="row"><small>Items</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{ printMoney(cart.total_charge) }</small>
              </td>
            </tr>
            <tr>
              <th scope="row"><small>Deposit</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{ printMoney(cart.total_deposit) }</small>
              </td>
            </tr>
            <tr>
              <th scope="row"><small>Tax</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{ printMoney(cart.total_tax) }</small>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <small className="card-text text-alert">
            Note: the deposit will be returned at the end of your rental.*
          </small>
        </p>
        <hr/>
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th scope="row"><small>Order total</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-dark fw-bold">
                  { printMoney(cart.total_charge + cart.total_deposit + cart.total_tax) }
                </small>
              </td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <CartTxnMethodRadio setTxnMethod={setTxnMethod} />
        <CartCheckoutButton cart={cart} method={txnMethod} disabled={!isReady} />
      </div>
    </div>
  );
}
