import { useState, useEffect, useContext } from 'react';

import { CartIncompleteCheckout } from './CartIncompleteCheckout';
import { CartProceedToCheckout } from './CartProceedToCheckout';
import { CartItemsList } from './CartItemsList';

import { FlashContext } from '../../providers/FlashProvider';

export const Index = () => {

  const [cart, setCart] = useState({});
  const [reservedItems, setReservedItems] = useState([]);
  const [unreservedItems, setUnreservedItems] = useState([]);

  const [isReady, setIsReady] = useState(false);

  const { renderFlash } = useContext(FlashContext);

  useEffect(() => {

    const getData = async (url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setCart(data.cart);
      setReservedItems(data.reserved_items);
      setUnreservedItems(data.unreserved_items);

      setIsReady((data.reserved_items.length > 0) && (data.unreserved_items.length === 0));

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
            <h1>Cart</h1>
            <p>See what's in your cart and make edits to your reservations.</p>
            <p>A 25% safety deposit is charged at delivery and returned at the end of rental.</p>
            <hr />
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row">
        </div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <CartItemsList unreservedItems={unreservedItems} reservedItems={reservedItems} />
          </div>
          <div className="col-md-4">
          {isReady
            ? <CartProceedToCheckout cart={cart} />
            : <CartIncompleteCheckout />
          }
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}
