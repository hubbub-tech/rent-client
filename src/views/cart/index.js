import { useState, useEffect, useContext } from 'react';

import { CartCheckout } from './CartCheckout';
import { CartItemsList } from './CartItemsList';

import { Feedback } from '../../base/Feedback';
import { FlashContext } from '../../providers/FlashProvider';

export const Index = () => {

  const [cart, setCart] = useState({});
  const [reservedItems, setReservedItems] = useState([]);
  const [unreservedItems, setUnreservedItems] = useState([]);

  const { addFlash, removeFlash } = useContext(FlashContext);

  useEffect(() => {
    const renderFlash = async(message, status, timeout = 1000) => {
      addFlash({ message, status });
      setTimeout(() => removeFlash(), timeout);
    }

    const getData = async (url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setCart(data.cart);
      setReservedItems(data.reserved_items);
      setUnreservedItems(data.unreserved_items);

      renderFlash("Your cart is up to date.", "info", 5000);
    };

    getData(process.env.REACT_APP_SERVER + '/cart')
    .catch(console.error);
  }, []);

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
        </div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <CartCheckout cart={cart} unreservedItems={unreservedItems} reservedItems={reservedItems} />
            <CartItemsList unreservedItems={unreservedItems} reservedItems={reservedItems} />
            <Feedback />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}
