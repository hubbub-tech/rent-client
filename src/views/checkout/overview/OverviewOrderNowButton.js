import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlashContext } from '../../../providers/FlashProvider';

export const OverviewOrderNowButton = ({ disabled, cart }) => {

  const navigate = useNavigate();

  const { renderFlash } = useContext(FlashContext);


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
      return data;
    };

    const tryRedirect = (data) => {
      (data.redirect_url)
        ? window.location.href = data.redirect_url
        : renderFlash(data.message, 'danger', 5000);
    }

    postData(process.env.REACT_APP_SERVER + '/checkout/validate')
    .then(tryRedirect)
    .catch(console.error);
  };


  return (
    <button
      className="btn btn-success"
      type="button"
      onClick={handleCheckoutRequest}
      disabled={disabled}
    >
      Continue to Payment
    </button>
  );
}
