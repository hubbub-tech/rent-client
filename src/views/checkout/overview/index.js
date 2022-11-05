import { useState, useEffect, useContext } from 'react';

import { OverviewPanel } from './OverviewPanel';

export const Index = () => {

  const [cart, setCart] = useState({});
  const [reservedItems, setReservedItems] = useState([]);
  const [unreservedItems, setUnreservedItems] = useState([]);

  useEffect(() => {

    const getData = async (url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const responseClone = response.clone();
      const data = await responseClone.json();

      setCart(data.cart);
      setReservedItems(data.reserved_items);
      setUnreservedItems(data.unreserved_items);

      return response;
    };

    const cacheData = async(response) => {
      if (response.ok) {
        const feedCache = await caches.open('checkoutData');

        feedCache.delete(process.env.REACT_APP_SERVER + '/checkout/overview');
        feedCache.put(process.env.REACT_APP_SERVER + '/checkout/overview', response)
        .catch(console.error);
      }
    };

    getData(process.env.REACT_APP_SERVER + '/cart')
    .then(cacheData)
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-3">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mt-4">
            <h1>Checkout</h1>
            <p>See an overview before you place your order.</p>
            <p>A 25% safety deposit is charged at delivery and returned at the end of rental.</p>
            <hr />
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <OverviewPanel cart={cart} items={reservedItems} isReady={unreservedItems.length === 0} />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </main>
  );
}
