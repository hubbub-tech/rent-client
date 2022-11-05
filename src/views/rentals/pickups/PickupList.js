import { PickupEvent } from './PickupEvent';

export const PickupList = ({ pickups }) => {

  return (pickups)
    ? <div className="row">
      {pickups.map((pickup, index) => (
        <PickupEvent key={pickup.id} pickup={pickup} orders={pickup.orders} />
      ))}
      </div>
    : null;
}
