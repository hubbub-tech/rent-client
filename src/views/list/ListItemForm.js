import { useState, useEffect, useContext } from 'react';

import { ListImageURLDisplay } from './ListImageURLDisplay';
import { ListCalendarInput } from './ListCalendarInput';
import { ListAddressInput } from './ListAddressInput';

import { FlashContext } from '../../providers/FlashProvider';

export const ListItemForm = () => {

  const { addFlash, removeFlash } = useContext(FlashContext);

  const defaultSelected = { from: null, to: null };
  const [dtRange, setDtRange] = useState(defaultSelected);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date(7976357062000)); // arbitrary date in ~2222 CE

  const defaultAddress = { formatted: null, lat: null, lng: null };
  const [address, setAddress] = useState(defaultAddress)

  const [imageURLs, setImageURLs] = useState([]);
  const [imageBase64s, setImageBase64s] = useState([]);

  const defaultItem = { name: null, retailPrice: null, description: null };
  const [item, setItem] = useState(defaultItem);


  const renderFlash = async(message, status, timeout = 1000) => {
    addFlash({ message, status });
    setTimeout(() => removeFlash(), timeout);
  }


  const handleListItem = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          item,
          address,
          calendar: {
            dtStarted: Math.floor( dtRange.from.getTime() / 1000),
            dtEnded: Math.floor( dtRange.to.getTime() / 1000),
          },
          imageBase64s
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);

      return response;
    };

    postData(process.env.REACT_APP_SERVER + '/list')
    .catch(console.error);
  };

  return (
    <form onSubmit={handleListItem}>
      <div className="mt-4">
        <label htmlFor="itemName" className="form-label">Item Name</label>
        <input
          type="text"
          className="form-control"
          id="itemName"
          name="name"
          minLength="1"
          maxLength="20"
          onChange={e => setItem({ ...item, name: e.target.value })}
          required
        />
        <div id="nameHelp" className="form-text">Item names shouldn't exceed 20 characters.</div>
      </div>

      <div className="mt-4">
        <label htmlFor="itemRetailPrice">Retail Price (USD)</label>
        <input
          type="number"
          className="form-control"
          id="itemRetailPrice"
          name="retailPrice"
          step="0.01"
          min="1.00"
          max="1000.00"
          onChange={e => setItem({ ...item, retailPrice: e.target.value })}
          required
        />
        <div id="retailPriceHelp" className="form-text">How much does it cost to buy new?</div>
      </div>

      <div className="mt-4">
        <label htmlFor="itemRetailPrice">When is it available to rent?</label>
        <ListCalendarInput
          minDate={minDate}
          maxDate={maxDate}
          defaultMonth={new Date()}
          dtRange={dtRange}
          setDtRange={setDtRange}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="itemDescription" className="form-label">Can you tell us about this item's condition?</label>
        <textarea
          className="form-control"
          id="itemDescription"
          name="description"
          onChange={e => setItem({ ...item, description: e.target.value })}
          required
        />
        <div id="itemDescription" className="form-text">Share any details relevant future renters.</div>
      </div>

      <label className="mt-4 form-label">List Item</label>
      <ListImageURLDisplay
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        imageBase64s={imageBase64s}
        setImageBase64s={setImageBase64s}
      />
      <div id="addressHelp" className="form-text">You can upload up to 3 photos.</div>

      <label className="mt-4 form-label">Where are you listing from?</label>
      <ListAddressInput setAddress={setAddress} />
      <div id="addressHelp" className="form-text">Tell us where this item currently is.</div>

      <div className="d-grid gap-2 my-4">
        <button
          type="submit"
          className="btn btn-success"
        >
          List Item
        </button>
      </div>
    </form>
  );
}
