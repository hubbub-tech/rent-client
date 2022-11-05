import { Fragment } from 'react';

import { printMoney, printDate } from '../../utils.js';

export const SuccessReceipt = ({ cart }) => {
  const dateToday = new Date();
  return (
    <Fragment>
      <h2 className="fs-5">Your Receipt</h2>
      <small>placed on: { printDate(dateToday.getTime() / 1000) }</small>
      <hr className="mx-2" />
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
    </Fragment>
  );
}
