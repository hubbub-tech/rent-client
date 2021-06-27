import React from 'react';

const NumInput = ({
  id,
  name,
  label,
  onChange,
  minLength = null,
  maxLength = null,
  placeholder = null,
  required = false
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type="number"
        className="form-control"
        id={id}
        name={name}
        step="0.01"
        placeholder={placeholder}
        onChange={onChange}
        min="1.00"
        max="1000.00"
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default NumInput;
