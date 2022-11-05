import { useNavigate } from 'react-router-dom';

export const OrderAgainButton = ({ itemId }) => {

  let navigate = useNavigate();

  const viewItem = () => navigate(`/item/${itemId}`);

  return (
    <button
      type="button"
      onClick={viewItem}
      className="btn btn-success btn-sm mx-1"
    >
      Rent Again
    </button>
  );
}
