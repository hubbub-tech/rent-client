import React from 'react';
import { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';

import AddressForm from './AddressForm';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import '../../dates.css';

const ListForm = ({ setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;
  const formData = new FormData();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [item, setItem] = useState({
    "name": null,
    "price": null
  });
  const [details, setDetails] = useState({
    "description": null,
    "condition": null,
    "weight": null,
    "volume": null,
  });
  const [tags, setTags] = useState([]);
  const [address, setAddress] = useState({});
  const [calendar, setCalendar] = useState({
    "startDate": null,
    "endDate": null
  });
  const [selectedTags, setSelectedTags] = useState([])
  const [focusedInput, setFocusedInput] = useState(null);

  const handleOnDatesChange = ({ startDate, endDate }) => {
    setCalendar({ startDate, endDate });
  }

  const handleOnSelectChange = (e) => {
    let newSelectedTags = new Set(selectedTags.concat(e.target.value));
    setSelectedTags(selectedTags => newSelectedTags);
  }

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? '/' : null;
    return res.json()
  }

  const submit = (e) => {
    e.preventDefault();
    formData.append('name', item.name);
    formData.append('price', item.price);

    formData.append('description', details.description);
    formData.append('condition', details.condition);
    formData.append('weight', details.weight);
    formData.append('volume', details.volume);

    formData.append('startDate', calendar.startDate.toJSON());
    formData.append('endDate', calendar.endDate.toJSON());
    formData.append('selectedTags', selectedTags);
    formData.append('isDefaultAddress', isDefaultAddress);

    formData.append('num', address.num);
    formData.append('street', address.street);
    formData.append('apt', address.apt);
    formData.append('city', address.city);
    formData.append('state', address.state);
    formData.append('zip', address.zip_code);

    formData.append('image', selectedFile);

    // Display the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    fetch('/list/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);

      if (redirectUrl) {
        history.push(redirectUrl);
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    fetch('/list')
    .then(res => res.json())
    .then(data => {
      setTags(data.tags);
      setAddress(data.address);
    });
  }, []);
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInputItemName"
              name="item[name]"
              onChange={e => setItem({ ...item, name: e.target.value })}
              minLength="1"
              maxLength="49" required />
            <label htmlFor="floatingInputItemName">Item Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInputItemPrice"
              name="item[price]"
              step="0.01"
              onChange={e => setItem({ ...item, price: e.target.value })}
              min="1.00"
              max="1000.00" required />
            <label htmlFor="floatingInputItemPrice">Retail Price (USD)</label>
          </div>
          <br />
          <div className="row">
            <label htmlFor="floatingInput">Item Availability</label>
            <DateRangePicker
              startDate={calendar.startDate}
              startDateId="listing-start-date"
              endDate={calendar.endDate}
              endDateId="listing-end-date"
              onDatesChange={handleOnDatesChange}
              focusedInput={focusedInput}
              onFocusChange={focusedInput => setFocusedInput(focusedInput)}
              orientation='vertical'
              required={true} />
          </div>
          <br />
          <div className="form-check mb-3">
            <select
              className="form-control"
              size="3"
              multiple
              aria-label="Select Tags"
              onChange={handleOnSelectChange}>
              {tags.map((tag) => (
                <option value={tag.name} key={tag.name}>{tag.name}</option>
              ))}
            </select>
          </div>
          <small className="card-text">
            <font size="-1">
              The more descriptive you are, the more customers you'll bring in!
            </font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingDescription"
              name="details[description]"
              onChange={e => setDetails({ ...details, description: e.target.value })} required />
            <label htmlFor="floatingDescription">Item Description</label>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Product Photo (Portrait Ideally)</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              accept="image/*"
              onChange={e => setSelectedFile(e.target.files[0])}
              required
              />
          </div>
          <div className="row">
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputCondition"
                  name="details[condition]"
                  step="1"
                  onChange={e => setDetails({ ...details, condition: e.target.value })}
                  min="1"
                  max="3" required />
                <label htmlFor="floatingInputCondition">Condition</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputWeight"
                  name="details[weight]"
                  step="1"
                  onChange={e => setDetails({ ...details, weight: e.target.value })}
                  min="1"
                  max="3" required />
                <label htmlFor="floatingInputWeight">Weight</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputVolume"
                  name="details[volume]"
                  step="1"
                  onChange={e => setDetails({ ...details, volume: e.target.value })}
                  min="1"
                  max="3" required />
                <label htmlFor="floatingInputVolume">Volume</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="isDefaultAddress"
                  id="isDefaultAddressCheckbox"
                  type="checkbox"
                  checked={isDefaultAddress}
                  onChange={e => setIsDefaultAddress(!isDefaultAddress)} />
                <label className="form-check-label" htmlFor="isDefaultAddressCheckbox">
                  Are you listing from your address on record?
                </label>
              </div>
            </div>
          </div>
          <br />
          {!isDefaultAddress && <AddressForm address={address} setAddress={setAddress} />}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="GuideToListingRequired"
              id="GuideToListing" required />
            <label className="form-check-label" htmlFor="GuideToListing">
              Yes, I have read <a href="/how-to-list" target="_blank">How to List Guide</a>.
            </label>
          </div>
          <br />
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ListForm;
