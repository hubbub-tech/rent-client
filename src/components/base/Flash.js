import React from 'react';

const Flash = ({flashMessages}) => {
  if (flashMessages) {
    return (
      <div>
        {flashMessages.map((message, index) => (
          <div
            className="alert alert-primary alert-dismissible fade show mb-0"
            role="alert"
            key={index}>
            {message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close">
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default Flash;
