import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeliveryTimeslotsDisplay } from '../DeliveryTimeslotsDisplay';
import { DeliveryAddressInput } from '../DeliveryAddressInput';

import { FlashContext } from '../../../providers/FlashProvider';

export const PickupForm = ({ orders }) => {

  let navigate = useNavigate();

  const defaultAddress = { formatted: null, lat: null, lng: null };
  const [address, setAddress] = useState(defaultAddress);

  const [timeslots, setTimeslots] = useState([]);
  const [notes, setNotes] = useState();

  const { addFlash, removeFlash } = useContext(FlashContext);

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

    const renderFlash = async(message, status, timeout = 1000) => {
      addFlash({ message, status });
      setTimeout(() => removeFlash(), timeout);
    }

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
    .then(response => response.ok && navigate('/orders/history'))
    .catch(console.error);
  }

  const disable = () => {
    if (address.formatted === null) return true;
    if (timeslots.length === 0) return true;

    return false;
  };

  return (
    <form onSubmit={handlePickupSchedule}>
      <label className="mt-4 form-label">Availabilities</label>
      <DeliveryTimeslotsDisplay timeslots={timeslots} setTimeslots={setTimeslots} />
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
          disabled={disable()}
        >
          Schedule Pickup
        </button>
      </div>
    </form>
  );
}
