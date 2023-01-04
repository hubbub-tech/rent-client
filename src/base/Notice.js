import React, { useState, useCallback, useContext } from 'react';

export const Notice = ({ show = false }) => {

  const [message, setMessage] = useState("The website is currently under maintenance, some functionality might be limited.")
  return (show)
    ?   <div
            className={`alert alert-info alert-dismissible fade show mb-0`}
            role="alert"
        >
            { message }
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close">
            </button>
        </div>
    :   null;
}