import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';
import AddressForm from './AddressForm';

const ListForm = ({ cookies, setFlashMessages }) => {
  let history = useHistory();
  let statusOK;
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
  const [address, setAddress] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const addressDisplay = `${address.num} ${address.street}, ${address.city}`;

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    formData.append('name', item.name);
    formData.append('price', item.price);

    formData.append('description', details.description);
    formData.append('condition', details.condition);
    formData.append('weight', details.weight);
    formData.append('volume', details.volume);

    formData.append('startDate', startDate.toJSON());
    formData.append('endDate', endDate.toJSON());
    formData.append('isDefaultAddress', isDefaultAddress);

    formData.append('num', address.num);
    formData.append('street', address.street);
    formData.append('apt', address.apt);
    formData.append('city', address.city);
    formData.append('state', address.state);
    formData.append('zip', address.zip_code);

    formData.append('image', selectedFile);

    fetch(process.env.REACT_APP_SERVER + '/list/submit', {method: 'POST', body: formData})
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push('/');
      }
    })
    .catch(error => console.log(error));
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (!startDate || !endDate) {
      setIsValid(false);
    } else if (startDate > endDate) {
      setIsValid(false);
      setErrors(["Your start date can't be after your end date."])
    } else if (startDate.getTime() === endDate.getTime()) {
      setIsValid(false);
      setErrors(["Your rental must be at least one full day."])
    } else {
      setIsValid(true);
      setErrors([])
    }
  },[startDate, endDate]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/list', {
      method: 'POST',
      body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => setAddress(data.address));
  },[]);
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12 mt-3 mb-0">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="newItemName"
                  name="itemName"
                  onChange={e => setItem({ ...item, name: e.target.value })}
                  minLength="1"
                  maxLength="49"
                  required
                />
                <label htmlFor="newItemName">Item Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newItemPrice"
                  name="itemPrice"
                  step="0.01"
                  onChange={e => setItem({ ...item, price: e.target.value })}
                  min="1.00"
                  max="1000.00"
                  required
                />
                <label htmlFor="newItemPrice">Retail Price (USD)</label>
              </div>
            </div>
            <div className="col-sm-12 mt-0">
              <p className="text-sm-start text-center my-2">Item Availability</p>
              <div className="row mt-0 mb-3">
                <DayPickerInput
                  classNames={{container: "col-sm-5 my-1 text-center"}}
                  onDayChange={setStartDate}
                  selectedDays={startDate}
                  placeholder="MM/DD/YYYY"
                  formatDate={formatDate}
                  parseDate={parseDate}
                />
              <div className="col-sm-2 mt-1 mb-0 text-center">
                  <p className="text-center">to</p>
                </div>
                <DayPickerInput
                  classNames={{container: "col-sm-5 my-1 text-center"}}
                  onDayChange={setEndDate}
                  selectedDays={endDate}
                  placeholder="MM/DD/YYYY"
                  formatDate={formatDate}
                  parseDate={parseDate}
                />
                <FormErrors errors={errors} color={"red"} />
              </div>
            </div>
          </div>
          <small className="card-text">
            <font size="-1">
              The more descriptive you are, the more customers you'll bring in!
            </font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="newItemDescription"
              name="itemDescription"
              onChange={e => setDetails({ ...details, description: e.target.value })}
              required
            />
            <label htmlFor="newItemDescription">Item Description</label>
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
            <p className="text-start my-1">More Info</p>
            <small className="text-start mb-2">
              <font size="-1">
                Please rank the item on a 1-3 scale for each the metrics below (increasing/improving from 1 to 3).
              </font>
            </small>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newItemCondition"
                  name="itemCondition"
                  step="1"
                  onChange={e => setDetails({ ...details, condition: e.target.value })}
                  min="1"
                  max="3"
                  required
                />
                <label htmlFor="newItemCondition">Condition</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newItemWeight"
                  name="itemWeight"
                  step="1"
                  onChange={e => setDetails({ ...details, weight: e.target.value })}
                  min="1"
                  max="3"
                  required
                />
                <label htmlFor="newItemWeight">Weight</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newItemVolume"
                  name="itemVolume"
                  step="1"
                  onChange={e => setDetails({ ...details, volume: e.target.value })}
                  min="1"
                  max="3"
                  required
                />
                <label htmlFor="newItemVolume">Volume</label>
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
                  onChange={e => setIsDefaultAddress(!isDefaultAddress)}
                />
                <label className="form-check-label" htmlFor="isDefaultAddressCheckbox">
                  Are you listing from this address: {addressDisplay}?
                </label>
              </div>
            </div>
          </div>
          <br />
          {!isDefaultAddress && <AddressForm address={address} setAddress={setAddress} required={!isDefaultAddress} />}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="GuideToListingRequired"
              id="GuideToListing"
              required
            />
            <label className="form-check-label" htmlFor="GuideToListing">
              Yes, I have read <a href="/how-to-list" target="_blank" rel="noreferrer">How to List Guide</a>.
            </label>
          </div>
          <br />
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' disabled={!isValid} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ListForm;
