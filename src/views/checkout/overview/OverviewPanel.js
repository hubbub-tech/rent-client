import { CheckoutItem } from '../CheckoutItem';

import { OverviewBlocked } from './OverviewBlocked';
import { OverviewOrderNowButton } from './OverviewOrderNowButton';
import { OverviewBackButton } from './OverviewBackButton';

import { printMoney } from '../../utils.js';

export const OverviewPanel = ({ cart, items, isReady }) => {
  return (
    <div className="container my-3">
      <div className="row">
        {!isReady && <OverviewBlocked />}
      </div>
      <div className="row">
      {items.map((item, index) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      </div>
      <hr />
      <div className="row">
        <table className="table table-sm table-borderless mb-1">
          <tbody>
            <tr className="my-0">
              <th scope="row"><small className="text-muted fw-normal">Subtotal</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{printMoney(cart.total_charge)}</small>
              </td>
            </tr>
            <tr className="my-0">
              <th scope="row"><small className="text-muted fw-normal">Deposit</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{printMoney(cart.total_deposit)}</small>
              </td>
            </tr>
            <tr className="my-0">
              <th scope="row"><small className="text-muted fw-normal">Tax</small></th>
              <td className="d-flex justify-content-end">
                <small className="text-muted">{printMoney(cart.total_tax)}</small>
              </td>
            </tr>
            <tr className="my-0">
              <th scope="row">Total</th>
              <td className="d-flex justify-content-end">
                <p className="fw-bolder">{printMoney(cart.total_charge + cart.total_deposit + cart.total_tax)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="d-grid col-6 gx-2">
          <OverviewOrderNowButton disabled={!isReady} cart={cart} />
        </div>
        <div className="d-grid col-6 gx-2">
          <OverviewBackButton />
        </div>
      </div>
    </div>
  );
}
