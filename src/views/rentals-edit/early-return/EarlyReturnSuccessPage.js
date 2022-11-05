import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import successSvg from '../assets/success.svg';

import { EarlyReturnSchedulePickupButton } from './EarlyReturnSchedulePickupButton';

import { RentalEditItem } from '../RentalEditItem';

import { FlashContext } from '../../../providers/FlashProvider';


export const EarlyReturnSuccessPage = () => {

  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [dtEnded, setDtEnded] = useState(new Date());

  const { renderFlash, removeFlash } = useContext(FlashContext);


  useEffect(() => {
    renderFlash("Your early return has been processed. Check your email for confirmation.", "info", 10000);

    const getCachedData = async() => {
      const cacheStorage = await caches.open('earlyReturnData');
      const cachedResponse = await cacheStorage.match(process.env.REACT_APP_SERVER + '/early-return/success');
      const cachedData = await cachedResponse.json();

      setDtEnded(new Date(cachedData.early_dt_end * 1000));
      setItem(cachedData.item);

      return cachedData;
    }

    getCachedData()
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Confirmation</h1>
            <p>We have received and processed your early return request.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={successSvg} alt="check-success" className="img-fluid" />
              </div>
              <div className="col-md-7 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">Your early return has been registered!</p>
                <RentalEditItem item={item} dtEnded={dtEnded} />
                <EarlyReturnSchedulePickupButton />
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
