import React, { useState, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';

const defaultSession = {
  userId: Cookies.get('userId'),
  sessionToken: Cookies.get('sessionToken')
};

export const SessionContext = React.createContext(defaultSession);

export const SessionProvider = ({ children }) => {

  const userId = Cookies.get('userId');
  const sessionToken = Cookies.get('sessionToken');

  return (
    <SessionContext.Provider value={{ userId, sessionToken }}>
      { children }
    </SessionContext.Provider>
  );
};
