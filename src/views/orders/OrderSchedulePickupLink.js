export const OrderSchedulePickupLink = ({ dtPickup, pickupId }) => {
  return (
    <a href={`/delivery/dropoff/${Date.parse(dtPickup)}`} className="card-link mx-2">
      { pickupId === null ? 'Schedule Pickup' : 'Edit Pickup' }
    </a>
  );
}
