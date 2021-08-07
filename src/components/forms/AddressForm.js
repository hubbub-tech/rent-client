import React from 'react';

const AddressForm = ({ address, setAddress, required = false }) => {
  return (
    <div className="row g-2">
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="addressNum"
            name="addressNum"
            onChange={e => setAddress({ ...address, num: e.target.value })}
            min="0"
            maxLength="100000"
            required={required}
          />
        <label htmlFor="addressNum">House Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressStreet"
            name="addressStreet"
            onChange={e => setAddress({ ...address, street: e.target.value })}
            minLength="1"
            maxLength="90"
            required={required}
          />
        <label htmlFor="addressStreet">Street Name</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressApt"
            name="addressApt"
            onChange={e => setAddress({ ...address, apt: e.target.value })}
            minLength="1"
            maxLength="19"
          />
          <label htmlFor="addressApt">Apartment</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressZipCode"
            name="addressZipCode"
            onChange={e => setAddress({ ...address, zip_code: e.target.value })}
            minLength="1"
            maxLength="9"
            required={required}
          />
          <label htmlFor="addressZip">Zip Code</label>
        </div>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="New York"
          value="New York"
          id="addressCity"
          aria-label="NYC Only"
          disabled
        />
        <label htmlFor="addressCity">City</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="NY"
          value="NY"
          id="addressState"
          aria-label="NY State Only"
          disabled
        />
        <label htmlFor="addressState">State</label>
      </div>
    </div>
  );
}

export default AddressForm;
