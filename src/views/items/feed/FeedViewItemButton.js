import { useNavigate } from 'react-router-dom';

export const FeedViewItemButton = ({ itemId }) => {
  let navigate = useNavigate();

  const handleOnClick = () => navigate(`/inventory/i/id=${itemId}`);

  return (
    <div className="d-grid gap-2 d-flex justify-content-end">
      <button
        type="button"
        onClick={handleOnClick}
        className="btn btn-hubbub btn-sm"
      >
        See Details
      </button>
    </div>
  );
}
