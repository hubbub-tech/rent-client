import { useEffect, useContext } from 'react';

import cancelSvg from '../assets/cancel.svg';

import { CancelReturnToFeedButton } from './CancelReturnToFeedButton';

import { FlashContext } from '../../../providers/FlashProvider';


export const Index = () => {

  const { renderFlash } = useContext(FlashContext);

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = response.json();
      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);
    };

    getData(process.env.REACT_APP_SERVER + '/checkout/cancel')
    .catch(console.error);
  }, []);


  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Cancelled Order</h1>
            <p>Your order was cancelled.</p>
            <p>We're sad to see you go, so check out our available items.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={cancelSvg} alt="check-cancel" className="img-fluid" />
              </div>
              <div className="col-md-11 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">Your order did not go through.</p>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <CancelReturnToFeedButton />
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </main>
  );
}
