import { useState } from 'react';

import { CartProceedButton } from './CartProceedButton';

export const CartIncompleteCheckout = () => {

  const [txnMethod, setTxnMethod] = useState('online');

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th scope="row"><small>Items</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">$--</small>
              </td>
            </tr>
            <tr>
              <th scope="row"><small>Deposit</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">$--</small>
              </td>
            </tr>
            <tr>
              <th scope="row"><small>Tax</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">$--</small>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <small className="card-text text-alert">
            Note: Set dates on all your rentals to proceed to checkout.*
          </small>
        </p>
        <hr/>
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th scope="row"><small>Order total</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-dark fw-bold">$--</small>
              </td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <CartProceedButton cart={null} method={txnMethod} disabled={true} />
      </div>
    </div>
  );
}
