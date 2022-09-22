export const OrderSchedulePickupLink = ({ dtPickup, pickupId }) => {
  return (
    <a href={`/delivery/dropoff/${dtPickup * 1000}`} className="card-link mx-2">
      { pickupId === null ? 'Schedule Pickup' : 'Edit Pickup' }
    </a>
  );
}
