import React from 'react';

import { useState } from 'react';

const CheckboxList = ({ checkboxes, onChangeCheckbox }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const onChangeList = (e) => {
    let copySelectedCheckboxes;
    if (selectedCheckboxes.includes(e.target.value)) {
      let index = selectedCheckboxes.indexOf(e.target.value);
      copySelectedCheckboxes = [...selectedCheckboxes];
      copySelectedCheckboxes.splice(index);
    } else {
      copySelectedCheckboxes = [...selectedCheckboxes, e.target.value]
    }
    setSelectedCheckboxes(copySelectedCheckboxes);
    onChangeCheckbox(copySelectedCheckboxes);
  }
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
              onChange={onChangeList}
            />
            <span> { checkbox }</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;
