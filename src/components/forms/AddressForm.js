import React from 'react';

const AddressForm = ({ address, setAddress, required = false }) => {
  return (
    <div className="row g-2">
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputNum"
            name="address[num]"
            onChange={e => setAddress({ ...address, num: e.target.value })}
            minLength="1"
            maxLength="49"
            required={required}
          />
          <label htmlFor="floatingInputNum">Address Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputStreet"
            name="address[street]"
            onChange={e => setAddress({ ...address, street: e.target.value })}
            minLength="1"
            maxLength="49"
            required={required}
          />
          <label htmlFor="floatingInputStreet">Street</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputApt"
            name="address[apt]"
            onChange={e => setAddress({ ...address, apt: e.target.value })}
            minLength="1"
            maxLength="49"
          />
          <label htmlFor="floatingInputApt">Apartment</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputZipCode"
            name="address[zip]"
            onChange={e => setAddress({ ...address, zip: e.target.value })}
            minLength="1"
            maxLength="49"
            required={required}
          />
          <label htmlFor="floatingInputZipCode">Zip Code</label>
        </div>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="New York"
          value="New York"
          id="floatingInputCity"
          aria-label="NYC Only"
          disabled
        />
        <label htmlFor="floatingInputCity">City</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="NY"
          value="NY"
          id="floatingInputState"
          aria-label="NY State Only"
          disabled
        />
        <label htmlFor="floatingInputState">State</label>
      </div>
    </div>
  );
}

export default AddressForm;
