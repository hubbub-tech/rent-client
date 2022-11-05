import { printDate } from '../../utils.js';
import { ItemQuoteInput } from '../ItemQuoteInput';

import { DetailsRecPhoto } from './DetailsRecPhoto';
import { DetailsViewItemButton } from './DetailsViewItemButton';

import { useViewport } from '../../../hooks/Viewport';


export const DetailsRecCard = ({ src, item }) => {

  const viewport = useViewport();

  const getTextWidth = () => {
    return (viewport.width > 500)
      ? "200px" : "125px" 
  };

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

          <a
            href={`/item/${item.id}`}
            className="text-decoration-none hubbub-link"
          >
            <h2
              className="fs-6 d-inline-block text-truncate"
              style={{ maxWidth: getTextWidth() }}
            >
              { item.name }
            </h2>
          </a>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <ItemQuoteInput price={item.retail_price} />
          </div>

          <DetailsViewItemButton itemId={item.id} />
        </div>
      </div>
    </div>
  );
}
