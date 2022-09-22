export const OrderScheduleDropoffLink = ({ dtDropoff, dropoffId }) => {
  return (
    <a href={`/orders/dropoff/${dtDropoff * 1000}`} className="card-link mx-2">
      { dropoffId === null ? 'Schedule Dropoff' : 'Edit Dropoff' }
    </a>
  );
}
