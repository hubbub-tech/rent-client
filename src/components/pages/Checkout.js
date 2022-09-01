import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import FeedbackForm from '../forms/FeedbackForm';
import CheckoutCard from '../cards/CheckoutCard';
import PricingCard from '../cards/PricingCard';

const Checkout = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const hubbubId = Cookies.get('hubbubId');
  const [cart, setCart] = useState({});
  const [reservedItems, setReservedItems] = useState([]);
  const [unreservedItems, setUnreservedItems] = useState([]);

  const [checkoutSession, setCheckoutSession] = useState();

  const [toggle, setToggle] = useState(false);
  const [urlBase, setUrlBase] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/cart', {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setCart(data.cart);
        setReservedItems(data.reserved_items);
        setUnreservedItems(data.unreserved_items);
        setCheckoutSession(data.checkout_session);
        console.log(typeof(data.checkout_session), data.checkout_session)
        setUrlBase(data.photo_url);
      } else if (statusCode === 403) {
        setFlashMessages(data.messages);
        history.push('/logout');
      }
    });
  }, [toggle]);
  return (
    <main>
      <div className="container-md my-3">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mt-4">
            <h1>Checkout</h1>
            <p>See what's in your cart and place your order.</p>
            <p>A 25% safety deposit is charged at delivery and returned at the end of rental.</p>
            <hr />
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-7">
          {reservedItems.map((item, index) => (
            <CheckoutCard
              key={item.id}
              item={item}
              urlBase={urlBase}
              toggle={toggle}
              setToggle={setToggle}
              setFlashMessages={setFlashMessages}
            />
          ))}
          {unreservedItems.map((item, index) => (
            <CheckoutCard
              key={item.id}
              item={item}
              urlBase={urlBase}
              toggle={toggle}
              setToggle={setToggle}
              setFlashMessages={setFlashMessages}
            />
          ))}
          {(reservedItems.length === 0 && unreservedItems.length === 0) &&
            <p className="text-center fs-5 my-5">
              No items in cart. Check out our <a href="/inventory">Inventory</a>!
            </p>
          }
          <FeedbackForm setFlashMessages={setFlashMessages} userId={hubbubId} />
          </div>
          <div className="col-md-3">
            <PricingCard
              cart={cart}
              isReady={unreservedItems.length === 0}
              toggle={toggle}
              setToggle={setToggle}
              checkoutSession={checkoutSession}
              setFlashMessages={setFlashMessages}
            />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
