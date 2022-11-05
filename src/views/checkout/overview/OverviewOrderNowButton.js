import { useNavigate } from 'react-router-dom';

export const OverviewOrderNowButton = ({ disabled, cart }) => {

  let navigate = useNavigate();

  const handleCheckoutRequest = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          checkoutSession: cart.checkout_session_key,
          txnMethod: 'online',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      return data
    };

    postData(process.env.REACT_APP_SERVER + '/checkout/validate')
    .then(data => window.location.href = data.redirect_url)
    .catch(console.error);
  };


  return (
    <button
      className="btn btn-success"
      type="button"
      onClick={handleCheckoutRequest}
      disabled={disabled}
    >
      Order Now
    </button>
  );
}
