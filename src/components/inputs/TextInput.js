import React from 'react';

const TextInput = ({
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
        type="text"
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default TextInput;
