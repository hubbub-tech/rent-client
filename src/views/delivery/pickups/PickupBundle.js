import { printDate } from '../../utils.js';

export const PickupBundle = ({ date, orders }) => {
  return (
    <div className="col-12 my-4">
      <div className="row">
        <div className="d-grid col-12">
          <h2 className="fs-5 fw-bold">Schedule for { printDate(date) }</h2>
          {orders.map((order, index) => (
            <p key={order.id}>{ order.item_name }</p>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <a
            href={`/orders/pickup/${date * 1000}`}
            className="btn btn-success btn-sm"
          >
            Schedule Pickup {'->'}
          </a>
        </div>
      </div>
    </div>
  );
}
