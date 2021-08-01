import React from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const Logout = ({ setFlashMessages }) => {
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      Cookies.remove('hubbubToken');
      Cookies.remove('hubbubId');
      Cookies.remove('cartSize');
    } else {
      Cookies.remove('hubbubToken');
      Cookies.remove('hubbubId');
      Cookies.remove('cartSize');
    }

    setFlashMessages(["You've been logged out! Come back soon!"])
  }, []);
  return <Redirect to='/' />
}

export default Logout;
