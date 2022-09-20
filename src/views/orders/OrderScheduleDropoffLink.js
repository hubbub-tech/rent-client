export const OrderScheduleDropoffLink = ({ dtDropoff, dropoffId }) => {
  return (
    <a href={`/delivery/dropoff/${Date.parse(dtDropoff)}`} className="card-link mx-2">
      { dropoffId === null ? 'Schedule Dropoff' : 'Edit Dropoff' }
    </a>
  );
}
