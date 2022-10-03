export const OrderSchedulePickupLink = ({ dtPickup, pickupId }) => {
  return (
    <a href={`/orders/pickup/${dtPickup * 1000}`} className="card-link mx-2">
      { pickupId === null ? 'Schedule Pickup' : 'Edit Pickup' }
    </a>
  );
}
