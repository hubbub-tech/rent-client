import React from 'react';
import { useState, useEffect } from 'react';

const LocationFilter = ({ items, filteredItems, setFilteredItems }) => {
  const onChangeTaskType = (e) => {
    let newFilteredItems = []
    for (let i = 0; i < items.length; i++) {
      if (items[i].type == e.target.value) {
        newFilteredItems.push(tasks[i]);
      }
    }
    setFilteredTasks(newFilteredTasks);
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
