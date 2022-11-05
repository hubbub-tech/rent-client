import { RentalEditItemPhotoSm } from './RentalEditItemPhotoSm';

import { printDate } from '../utils.js';

export const RentalEditItem = ({ item, dtEnded }) => {
  return (
    <div className="container my-3 col-12">
      <div className="row mt-2">
        <div className="col-2">
          <RentalEditItemPhotoSm
            href={`/item/${item.id}`}
            src={item.image_url}
            className="img-fluid"
            alt={item.name}
          />
        </div>
        <div className="col-10">
          <div className="row">
            <div className="d-grid col-lg-10 col-md-8 col-10">
              <h2 className="fs-6 fw-bold">{item.name}</h2>
              <small className="mb-2">Ending on { printDate(dtEnded.getTime() / 1000) }</small>
              <small className="text-muted">{ item.description }</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
