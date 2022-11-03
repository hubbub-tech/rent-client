import { useState } from 'react';

import { CartProceedButton } from './CartProceedButton';

import { printMoney } from '../utils.js';

export const CartProceedToCheckout = ({ cart }) => {

  const [txnMethod, setTxnMethod] = useState('online');

  return (
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
        <CartProceedButton cart={cart} method={txnMethod} disabled={false} />
      </div>
    </div>
  );
}
