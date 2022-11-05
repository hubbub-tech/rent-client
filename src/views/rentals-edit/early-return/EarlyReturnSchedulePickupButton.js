import { useNavigate } from 'react-router-dom';

export const EarlyReturnSchedulePickupButton = () => {

  const navigate = useNavigate();

  const handleSchedulePickup = () => navigate('/rentals/schedule');
  return (
    <button
      type="button"
      className="btn btn-success"
      onClick={handleSchedulePickup}
    >
      Schedule Your Pickup
    </button>
  );
}
