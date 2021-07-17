import React from 'react';
import { useState, useEffect } from 'react';

const FilterForm = ({ items, setFilters }) => {
  const boundary = 10015;
  const [options, setOptions] = useState({
    "isNorth": true
  });

  const onChangeLocation = (e) => {
    let filters = [];
    for (let i = 0, i < items.length, i++) {
      if (parseInt(items[i].address_zip) > boundary && e.target.value === 'Near Columbia') {
        filters.push(items[i]);
      } else if (parseInt(items[i].address_zip) < boundary && e.target.value === 'Near NYU') {
        filters.push(items[i]);
      }
    }
    setFilters(filters);
  }
  return (
    <div className="row">
      <div className="col-12 my-2">
        <h5 className="text-start">Location</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="location" 
              id="columbia"
              value="Near Columbia"
              onChange={onChangeLocation}
              checked={options.location.columbia}
            />
          <label className="form-check-label" htmlFor="columbia">
              Near Columbia
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="location"
              id="nyu"
              value="Near NYU"
              onChange={onChangeLocation}
              checked={options.location.nyu}
            />
          <label className="form-check-label" htmlFor="nyu">
              Near NYU
            </label>
          </div>
      </div>
    </div>
  );
}

export default FilterForm;
