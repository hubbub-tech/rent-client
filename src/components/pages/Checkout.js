import React from 'react';
import { useState, useEffect } from 'react';

import CheckoutCard from '../cards/CheckoutCard';
import PricingCard from '../cards/PricingCard';

const Checkout = ({setFlashMessages}) => {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [urlBase, setUrlBase] = useState(null);

  useEffect(() => {
    fetch('/checkout')
    .then(res => res.json())
    .then(data => {
      setCart(data.cart);
      setItems(data.items);
      setUrlBase(data.photo_url);
      setIsReady(data.is_ready);
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
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-7">
          {items.map((item, index) => (
            <CheckoutCard
              key={item.id}
              item={item}
              urlBase={urlBase}
              toggle={toggle}
              setToggle={setToggle}
              setFlashMessages={setFlashMessages}
            />
          ))}
          {items.length === 0 &&
            <p className="text-center fs-5 my-5">
              No items in cart. Check out our <a href="/inventory">Inventory</a>!
            </p>
          }
          </div>
          <div className="col-md-3">
            <PricingCard
              cart={cart}
              isReady={isReady}
              toggle={toggle}
              setToggle={setToggle}
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
