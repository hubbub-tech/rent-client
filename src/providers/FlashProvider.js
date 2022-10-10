import React, { useState, useCallback, useContext } from 'react';

const FlashNotification = () => {

  const { flash, removeFlash } = useContext(FlashContext);

  const closeNotification = () => removeFlash();
  return flash.message !== null
    ? <div
        className={`alert alert-${flash.status} alert-dismissible fade show mb-0`}
        role="alert"
      >
        { flash.message }
        <button
          type="button"
          onClick={closeNotification}
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close">
        </button>
      </div>
    : null
}

export const FlashContext = React.createContext(null);

export const FlashProvider = ({ children }) => {

  const defaultFlash = { message: null, status: 'info' };
  const [flash, setFlash] = useState(defaultFlash);

  const addFlash = useCallback(({ message, status }) => {
    setFlash({ message, status });
  }, []);

  const removeFlash = useCallback(() => {
    setFlash(defaultFlash);
  }, []);

  return (
    <FlashContext.Provider value={{ flash, addFlash, removeFlash }}>
      <FlashNotification />
      { children }
    </FlashContext.Provider>
  );
};
