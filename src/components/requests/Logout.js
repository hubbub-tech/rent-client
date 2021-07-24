import React from 'react';
import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useAnalytics } from '../base/GoogleTags';

const Logout = ({ setCookie, removeCookie, setFlashMessages }) => {
  const location = useLocation();
  useAnalytics(location.pathname);

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
