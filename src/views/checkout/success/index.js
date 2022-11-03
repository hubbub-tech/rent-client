import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import successSvg from '../assets/success.svg';

import { SuccessReceipt } from './SuccessReceipt';

import { CheckoutItem } from '../CheckoutItem';

import { FlashContext } from '../../../providers/FlashProvider';

export const Index = () => {

  const navigate = useNavigate();

  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  const { renderFlash, removeFlash } = useContext(FlashContext);

  useEffect(() => {
    renderFlash("Hang on, just finalizing your rental!", "info", 10000);

    const getCachedData = async(url) => {
      const cacheStorage = await caches.open('checkoutData');
      const cachedResponse = await cacheStorage.match(url);
      const cachedData = await cachedResponse.json();

      setItems(cachedData.reserved_items);
      setCart(cachedData.cart);
    };

    getCachedData(process.env.REACT_APP_SERVER + '/checkout/overview')
    .catch(console.error);


    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = response.json();
      let status = response.ok ? 'success' : 'danger';

      removeFlash();
      renderFlash(data.message, status, 10000);
    };

    getData(process.env.REACT_APP_SERVER + '/checkout')
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Confirmation</h1>
            <p>We've received your payment and are processing your rentals.</p>
            <p>For next steps, please schedule a dropoff date for your items.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={successSvg} alt="check-success" className="img-fluid" />
              </div>
              <div className="col-md-7 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">Thanks for renting from us!</p>
                {items.map((item, index) => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
              </div>
              <div className="col-md-4 col-12 my-2 bg-light px-3 py-3">
                <SuccessReceipt cart={cart} />
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </main>
  );
}
