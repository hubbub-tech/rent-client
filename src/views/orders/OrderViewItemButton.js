import { useNavigate } from 'react-router-dom';

export const OrderViewItemButton = ({ itemId }) => {

  let navigate = useNavigate();

  const viewItem = () => navigate(`/item/${itemId}`);

  return (
    <button
      type="button"
      onClick={viewItem}
      className="btn btn-dark btn-sm"
    >
      Item Details
    </button>
  );
}
