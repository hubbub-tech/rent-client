import React from 'react';

const PasswordInput = ({ id, name, label, onChange }) => {
  return (
    <div className="form-floating mb-3">
      <input
        type="password"
        className="form-control"
        id={id}
        name={name}
        onChange={onChange}
        minLength="8"
        maxLength="49"
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default PasswordInput;
