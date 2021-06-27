import React from 'react';

const Flash = ({ flashMessages, setFlashMessages }) => {
  const onClick = (e, index) => {
    let editedFlashes = [...flashMessages];
    editedFlashes.splice(index, 1);
    setFlashMessages(editedFlashes);
  }

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
              onClick={e => onClick(e, index)}
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
