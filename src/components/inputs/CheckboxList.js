import React from 'react';

import { useState } from 'react';

const CheckboxList = ({ checkboxes, onChangeCheckbox }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  return (
    <div className="row">
      {checkboxes.map((checkbox, index) => (
        <div className="col-sm-6" key={checkbox}>
          <label className="form-check-label" htmlFor={`checkbox-${index}`}>
            <input
              id={`checkbox-${index}`}
              value={checkbox}
              type="checkbox"
              checked={selectedCheckboxes.includes(checkbox)}
              onChange={e => {
                if (selectedCheckboxes.includes(e.target.value)) {
                  let index = selectedCheckboxes.indexOf(e.target.value)
                  let copySelectedCheckboxes = [...selectedCheckboxes];
                  copySelectedCheckboxes.splice(index)
                  setSelectedCheckboxes(copySelectedCheckboxes);
                } else {
                  setSelectedCheckboxes([...selectedCheckboxes, e.target.value]);
                }
                onChangeCheckbox(selectedCheckboxes);
              }}
            />
            <span> { checkbox }</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;
