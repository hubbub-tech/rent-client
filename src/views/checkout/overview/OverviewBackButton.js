import { useNavigate } from 'react-router-dom';

export const OverviewBackButton = () => {
  let navigate = useNavigate();

  const handleBackToCart = () => navigate('/cart');

  return (
    <button
      className="btn btn-outline-danger"
      type="button"
      onClick={handleBackToCart}
    >
      Back to Cart
    </button>
  );
}
