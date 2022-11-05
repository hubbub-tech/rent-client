import { useState } from 'react';
import { format, parse } from 'date-fns';

import { CartItemPhoto } from './CartItemPhoto';
import { CartEditItemForm } from './CartEditItemForm';
import { CartEditItemButton } from './CartEditItemButton';
import { CartRemoveItemButton } from './CartRemoveItemButton';
import { CartRefreshButton } from './CartRefreshButton';

import { DateRangePicker } from '../../inputs/date-range';
import { useViewport } from '../../hooks/Viewport';

import { printMoney, printDate } from '../utils.js';


export const CartUnreservedItem = ({ src, item, index, items }) => {

  const [toggle, setToggle] = useState(false);
  const [isEdited, isSetEdited] = useState(false);

  const viewport = useViewport();

  const handleToggle = () => setToggle(!toggle);

  const getTextWidth = () => {
    return (viewport.width > 1000)
      ? "300px" : "150px";
  }

  return (
    <div className="container my-3 col-12 pt-2 border border-info">
      <div className="row mt-2 gx-3">
        <div className="col-lg-2 col-md-3 col-4">
          <CartItemPhoto
            href={`/item/${item.id}`}
            src={item.image_url}
            className="img-fluid"
            alt={item.name}
          />
        </div>

        <div className="col-lg-10 col-md-9 col-8">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-10">
              <h2 className="fs-6 fw-bold">{item.name}</h2>
              <span className="d-inline-block text-truncate text-muted" style={{maxWidth: getTextWidth() }}>
                <small>{ item.description }</small>
              </span>
            </div>
            <div className="col-lg-4 col-md-4 col-2">
              <small className="my-1 d-flex justify-content-end">Price</small>
              <p className="text-success fw-bold my-1 d-flex justify-content-end">--</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-12">
              <CartEditItemForm item={item} isSetEdited={isSetEdited} id="editItemForm" />
            </div>
          </div>
          <div className="row mb-2 row-cols-auto d-flex justify-content-end">
            <div className="col">
              <CartEditItemButton
                toggle={toggle}
                onClick={handleToggle}
                disabled={() => false}
                form="editItemForm"
              />
            </div>
            {isEdited &&
              <div className="col">
                <CartRefreshButton />
              </div>
            }
            <div className="col">
              <CartRemoveItemButton itemId={item.id} />
            </div>
          </div>
        </div>
      </div>
      {isEdited &&
        <div className="row mt-2 px-1 bg-info text-center">
          <small>This page must be refreshed to see your new reservation dates.</small>
        </div>
      }
    </div>
  );
}
