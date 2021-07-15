import React from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ setCookie, removeCookie, setFlashMessages }) => {
  useEffect(() => {
    removeCookie('userId');
    removeCookie('cartSize');
    removeCookie('auth');

    setCookie('isLoggedIn', false, { path: '/' });

    setFlashMessages(["You've been logged out! Come back soon!"])
  }, []);
  return <Redirect to='/' />
}

export default Logout;
