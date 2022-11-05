import { useNavigate } from 'react-router-dom';

export const ExtendReturnToFeedButton = () => {

  const navigate = useNavigate();

  const handleReturnToFeed = () => navigate('/items/feed');
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={handleReturnToFeed}
    >
      Return to item feed
    </button>
  );
}
