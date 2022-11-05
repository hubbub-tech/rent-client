import { OrderUnit } from './OrderUnit';

export const OrderList = ({ orders }) => {

  return (orders)
    ? <div className="row">
      {orders.map((order, index) => (
        <OrderUnit key={order.id} order={order} />
      ))}
      </div>
    : null;
}
