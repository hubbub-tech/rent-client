import { useNavigate } from 'react-router-dom';

export const OrderEarlyReturnButton = ({ orderId }) => {

  let navigate = useNavigate();

  const handleEarlyReturn = () => navigate(`/orders/early-return/${orderId}`);

  return (
    <button
      type="button"
      onClick={handleEarlyReturn}
      className="btn btn-warning btn-sm"
    >
      Return Early
    </button>
  );
}
