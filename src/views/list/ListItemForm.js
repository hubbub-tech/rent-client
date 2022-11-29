import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ListItemButton } from './ListItemButton';
import { ListTagSelectInput } from './ListTagSelectInput';

import { ImageUploader } from '../../inputs/image-upload';
import { DateRangePicker } from '../../inputs/date-range';
import { AddressAutoInput } from '../../inputs/lookup-address';

import { FlashContext } from '../../providers/FlashProvider';


export const ListItemForm = ({ tags }) => {

  const navigate = useNavigate();

  const { renderFlash } = useContext(FlashContext);

  const defaultSelected = { from: undefined, to: undefined };
  const [dtRange, setDtRange] = useState(defaultSelected);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date(8000000000000)); // arbitrary date in 2222+ CE

  const defaultAddress = { formatted: null, lat: null, lng: null };
  const [address, setAddress] = useState(defaultAddress)

  const [imageURLs, setImageURLs] = useState([]);
  const [imageBase64s, setImageBase64s] = useState([]);

  const defaultItem = { name: null, retailPrice: null, description: null };
  const [item, setItem] = useState(defaultItem);

  const [selectedTags, setSelectedTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let isReady = item.name && item.retailPrice && item.description;
    if (!isReady) {
      setIsDisabled(true);
      return;
    }

    isReady = imageBase64s.length > 0;
    if (!isReady) {
      setIsDisabled(true);
      return;
    }

    isReady = address.formatted && address.lat && address.lng;
    if (!isReady) {
      setIsDisabled(true);
      return;
    }

    isReady = dtRange.from && dtRange.to;
    setIsDisabled(!isReady);
  }, [item, imageBase64s, address, dtRange]);

  const handleListItem = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
          imageBase64s,
          // tags: selectedTags
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseClone = await response.clone();
      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';
      renderFlash(data.message, status, 10000);

      return responseClone;
    };

    const handleResponse = async(res) => {
      setIsLoading(false);
      setIsDisabled(res.ok);

      const data = await res.json();
      navigate(`/item/${data.item_id}`);
    }

    postData(process.env.REACT_APP_SERVER + '/list')
    .then(handleResponse)
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
        <DateRangePicker
          minDate={minDate}
          maxDate={maxDate}
          defaultMonth={new Date()}
          selectedRange={dtRange}
          setSelectedRange={setDtRange}
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

      <label className="mt-4 form-label">Image Upload</label>
      <ImageUploader
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        imageBase64s={imageBase64s}
        setImageBase64s={setImageBase64s}
      />
      <div id="addressHelp" className="form-text">You can upload up to 3 photos.</div>

      <label className="mt-4 form-label">Where are you listing from?</label>
      <AddressAutoInput setAddress={setAddress} />
      <div id="addressHelp" className="form-text">Tell us where this item currently is.</div>

      {/*
        <label className="mt-4 form-label">Add Tags</label>
        <ListTagSelectInput tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      */}

      <div className="d-grid gap-2 my-4">
        <ListItemButton isLoading={isLoading} disabled={isDisabled} />
      </div>
    </form>
  );
}
