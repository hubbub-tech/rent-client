import { useState } from 'react';

import { CartItemPhoto } from './CartItemPhoto';
import { CartCalendarView } from './CartCalendarView';
import { CartRemoveItemButton } from './CartRemoveItemButton';

import { printMoney, printDate } from '../items/utils.js';

export const CartReservedCard = ({ src, item }) => {

  const [toggle, setToggle] = useState(false);

  const toggleCalendarView = () => setToggle(!toggle);

  return (
    <div className="card my-2">
      <h5 className="fs-6 card-header">from { printDate(item.reservation.dt_started) } to { printDate(item.reservation.dt_ended) }</h5>
      <div className="card-body">
        <div className="row mt-2">
          <div className="col-lg-2 col-md-3 col-4">
            <CartItemPhoto
              href={`/item/${item.id}`}
              src={src}
              className="img-fluid"
              alt={item.name}
            />
          </div>
          <div className="col-lg-10 col-md-9 col-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h1 className="fs-6 card-title">{item.name}</h1>
                  <div className="text-small mb-1">
                    <small className="text-success">{ printMoney(item.reservation.est_charge) }</small>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-grid gap-2 d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={toggleCalendarView}
                    className="btn btn-link btn-sm"
                  >
                    Edit
                  </button>
                  <CartRemoveItemButton itemId={item.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {toggle && <CartCalendarView item={item} />}
      </div>
    </div>
  );
}
