import { useNavigate } from 'react-router-dom';

export const SuccessScheduleButton = () => {

  const navigate = useNavigate();

  const handleNavToScheduler = () => navigate('/rentals/schedule');
  return (
    <button
      type="button"
      className="btn btn-success"
      onClick={handleNavToScheduler}
    >
      Schedule Dropoff & Pickup {" -> "}
    </button>
  );
}
