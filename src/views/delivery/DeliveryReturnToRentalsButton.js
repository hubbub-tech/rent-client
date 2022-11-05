import { useNavigate } from 'react-router-dom';

export const DeliveryReturnToRentalsButton = () => {

  const navigate = useNavigate();

  const handleReturnToRentals = () => navigate('/rentals');

  return (
    <button
      type="button"
      className="btn btn-dark"
      onClick={handleReturnToRentals}
    >
      Return to rentals
    </button>
  );
}
