import { printDate } from '../items/utils.js'

export const DeliveryItem = ({ order }) => {
  return (
    <div className="col">
      <h3 className="fs-6 mt-2">{ order.item_name }</h3>
      <p className="my-1">{ printDate(order.res_dt_start) } to { printDate(order.res_dt_end) }</p>
      <p className="my-2 text-muted"><small>{ order.item_description }</small></p>
    </div>
  );
}
