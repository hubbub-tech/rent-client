import { useNavigate } from 'react-router-dom';

export const OrderExtendButton = ({ orderId }) => {

  let navigate = useNavigate();

  const handleExtension = () => navigate(`/orders/extend/${orderId}`);

  return (
    <button
      type="button"
      onClick={handleExtension}
      className="btn btn-success btn-sm"
    >
      Extend
    </button>
  );
}
