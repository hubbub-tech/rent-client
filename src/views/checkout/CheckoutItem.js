import { CheckoutItemPhoto } from './CheckoutItemPhoto';

import { printMoney, printDate } from '../utils.js';

export const CheckoutItem = ({ item }) => {
  return (
    <div className="container my-3 col-12">
      <div className="row mt-2">
        <div className="col-2">
          <CheckoutItemPhoto
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
              <small className="mb-2">{ printDate(item.reservation.dt_started) } - { printDate(item.reservation.dt_ended) }</small>
              <small className="text-muted">{ item.description }</small>
            </div>
            <div className="col-lg-2 col-md-4 col-2">
              <small className="my-1 d-flex justify-content-end">Price</small>
              <p className="text-success fw-bold my-1 d-flex justify-content-end">{ printMoney(item.reservation.est_charge) }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
