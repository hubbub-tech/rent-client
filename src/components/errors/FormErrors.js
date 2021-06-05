import React from 'react';

const FormErrors = ({errors}) => {
  if (errors) {
    return (
      <div>
      {errors.map((error, index) => (
        <p key={index} style={{"color": "red"}}>{error}</p>
      ))}
      </div>
    );
  } else {
    return null;
  }
}

export default FormErrors;
