import { RentalItemPhoto } from '../RentalItemPhoto';

import { useViewport } from '../../../hooks/Viewport';

export const PickupEventItem = ({ order }) => {

  const viewport = useViewport();

  return (
    <div className="row gx-3 mt-0 mb-1">
      <div className="col-1">
      {(viewport.width > 500) &&
        <RentalItemPhoto
          href={`/item/${order.item_id}`}
          src={order.item_image_url}
          className="img-fluid"
          alt={order.item_name}
        />
      }
      </div>
      <div className="col-11">
        <small>{ order.item_name }</small>
      </div>
    </div>
  );
}
