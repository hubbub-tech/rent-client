import { printDate } from '../utils.js';
import { ItemQuoteInput } from '../ItemQuoteInput';

import { DetailsRecPhoto } from './DetailsRecPhoto';
import { DetailsViewItemButton } from './DetailsViewItemButton';


export const DetailsRecCard = ({ src, item }) => {
  return (
    <div className="col">
      <div className="card card-product">
        <div className="card-body">

          <div className="text-center position-relative">
            <DetailsRecPhoto
              href={`/item/${item.id}`}
              src={src}
              className="mb-3 img-fluid"
              alt={item.name}
            />

          </div>

          <div className="text-small mb-1">
            <a href={`/item/${item.id}`} className="text-decoration-none text-muted">
              <small>Next available { printDate(item.calendar.next_avail_date_start) }</small>
            </a>
          </div>

          <h2 className="fs-6">
            <a href={`/item/${item.id}`} className="text-inherit text-decoration-none">
              { item.name }
            </a>
          </h2>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <ItemQuoteInput price={item.retail_price} />
          </div>

          <DetailsViewItemButton itemId={item.id} />
        </div>
      </div>
    </div>
  );
}
