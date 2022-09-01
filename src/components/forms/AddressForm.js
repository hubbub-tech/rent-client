import React from 'react';

const AddressForm = ({ address, setAddress, required = false }) => {
  return (
    <div className="row g-2">
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressLineOne"
            name="addressLineOne"
            onChange={e => setAddress({ ...address, lineOne: e.target.value })}
            minLength="1"
            maxLength="90"
            required={required}
          />
        <label htmlFor="addressLineOne">Address Line 1</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressLineTwo"
            name="addressLineTwo"
            onChange={e => setAddress({ ...address, lineTwo: e.target.value })}
            minLength="1"
            maxLength="90"
            required={required}
          />
        <label htmlFor="addressLineTwo">Address Line 2</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressZipCode"
            name="addressZipCode"
            onChange={e => setAddress({ ...address, zip: e.target.value })}
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
