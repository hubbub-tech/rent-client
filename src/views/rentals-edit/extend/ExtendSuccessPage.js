import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import successSvg from '../assets/success.svg';

import { RentalEditItem } from '../RentalEditItem';

import { FlashContext } from '../../../providers/FlashProvider';


export const ExtendSuccessPage = () => {

  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [dtExtEnd, setDtExtEnd] = useState(new Date());

  const { renderFlash, removeFlash } = useContext(FlashContext);


  useEffect(() => {
    renderFlash("Hang on, just finalizing your extension!", "info", 10000);

    const getCachedData = async() => {
      const cacheStorage = await caches.open('extensionData');
      const cachedResponse = await cacheStorage.match(process.env.REACT_APP_SERVER + '/extend/success');
      const cachedData = await cachedResponse.json();

      setDtExtEnd(new Date(cachedData.ext_dt_end * 1000));
      setItem(cachedData.item);

      return cachedData;
    }

    const postData = async(url, cachedData) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          orderId: cachedData.order_id,
          dtEnded: Math.floor(cachedData.ext_dt_end),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const status = response.ok ? 'success' : 'danger';
      const data = await response.json();

      // renderFlash(data.message, status, 10000);
      return response;
    };

    getCachedData()
    .then(cachedData => {
      postData(process.env.REACT_APP_SERVER + '/orders/extend', cachedData)
      .catch(console.error);
    })
    .catch(console.error);

  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Confirmation</h1>
            <p>We've received your payment and are processing your extension.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={successSvg} alt="check-success" className="img-fluid" />
              </div>
              <div className="col-md-7 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">Your extension has been booked!</p>
                <RentalEditItem item={item} dtEnded={dtExtEnd} />
              </div>
              <div className="col-md-4 col-12 my-2 px-3 py-3">
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </main>
  );
}
