import { useEffect, useContext } from 'react';

import cancelSvg from '../assets/cancel.svg';

import { FlashContext } from '../../../providers/FlashProvider';


export const EarlyReturnCancelPage = () => {

  const { renderFlash } = useContext(FlashContext);

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = response.json();
      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);
      return response;
    };

    //getData(process.env.REACT_APP_SERVER + '/orders/early-return/cancel')
    //.catch(console.error);
  }, []);


  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Cancelled Early Return</h1>
            <p>Your early return request did not go through.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={cancelSvg} alt="check-cancel" className="img-fluid" />
              </div>
              <div className="col-md-11 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">Check out the other items in our feed.</p>
              </div>
              <div className="col-md-6 col-12 mb-2">
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </main>
  );
}
