import React, { useState, useCallback, useContext } from 'react';

const FlashNotification = ({ status, message }) => {

  const { removeFlash } = useContext(FlashContext);

  const closeNotification = () => removeFlash();
  return (
    <div
        className={`alert alert-${status} alert-dismissible fade show mb-0`}
        role="alert"
      >
        { message }
        <button
          type="button"
          onClick={closeNotification}
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close">
        </button>
      </div>
  );
}

export const FlashContext = React.createContext(null);

export const FlashProvider = ({ children }) => {

  const defaultFlash = { message: undefined, status: undefined };
  const [flash, setFlash] = useState(defaultFlash);

  const addFlash = useCallback(({ message, status }) => {
    setFlash({ message, status });
  }, []);

  const removeFlash = useCallback(() => {
    setFlash(defaultFlash);
  }, []);

  const renderFlash = async(message, status, timeout = 1000) => {
    addFlash({ message, status });
    setTimeout(() => removeFlash(), timeout);
  };

  return (
    <FlashContext.Provider value={{ flash, addFlash, removeFlash, renderFlash }}>
      { flash.message && <FlashNotification status={flash.status} message={flash.message} />}
      { children }
    </FlashContext.Provider>
  );
};
