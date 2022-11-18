import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeliveryAddressInput } from '../DeliveryAddressInput';

import { TimeRangeSelector } from '../../../inputs/time-range';
import { FlashContext } from '../../../providers/FlashProvider';

export const PickupForm = ({ orders }) => {

  let navigate = useNavigate();

  const defaultAddress = { formatted: null, lat: null, lng: null };
  const [address, setAddress] = useState(defaultAddress);

  const [timeslots, setTimeslots] = useState([]);
  const [notes, setNotes] = useState();


  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!address.formatted && timeslots.length === 0);
  }, [address, timeslots]);


  const { renderFlash } = useContext(FlashContext);

  const handlePickupSchedule = (e) => {
    e.preventDefault();

    const getOrderIds = (orders) => {
      let orderIds = [];
      let i = 0;
      while (i < orders.length) {
        orderIds.push(orders[i]["id"]);
        i += 1;
      }
      return orderIds;
    }

    const orderIds = getOrderIds(orders);

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ orderIds, address, timeslots, notes }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);

      return response;
    };

    postData(process.env.REACT_APP_SERVER + '/pickup/schedule')
    .then(response => response.ok && navigate('/orders/pickup/confirmation'))
    .catch(console.error);
  }


  return (
    <form onSubmit={handlePickupSchedule}>
      <label className="mt-4 form-label">Availabilities</label>
      <TimeRangeSelector timeRanges={timeslots} setTimeRanges={setTimeslots} />
      <div id="timeHelp" className="form-text">Let us know when you're available for our couriers to come.</div>

      <label className="mt-4 form-label">Pickup Address</label>
      <DeliveryAddressInput setAddress={setAddress} />
      <div id="addressHelp" className="form-text">Where should our couriers meet you?</div>

      <div className="mt-4">
        <label htmlFor="deliveryNotes" className="form-label">Delivery Notes</label>
        <textarea
          className="form-control"
          id="deliveryNotes"
          name="notes"
          placeholder="Leave delivery notes here."
          onChange={e => setNotes(e.target.value)}
          required
        />
        <div id="deliveryHelp" className="form-text">Share any details relevant to making your pickup go smoothly.</div>
      </div>

      <div className="d-grid gap-2 my-4">
        <button
          type="submit"
          className="btn btn-success"
          disabled={isDisabled}
        >
          Schedule Pickup
        </button>
      </div>
    </form>
  );
}
