import { useNavigate } from 'react-router-dom';

export const CartProceedButton = ({ disabled, cart, method }) => {

  let navigate = useNavigate();

  const handleProceedToCheckout = () => navigate('/checkout/overview');

  return (
    <div className="d-grid gap-2">
      <button
        className="btn btn-success"
        type="button"
        onClick={handleProceedToCheckout}
        disabled={disabled}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
