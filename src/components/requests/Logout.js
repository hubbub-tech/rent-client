import React from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const Logout = ({ setFlashMessages }) => {
  useEffect(() => {
    Cookies.remove('hubbubToken');
    Cookies.remove('cartSize');
    Cookies.remove('userId');
    
    setFlashMessages(["You've been logged out! Come back soon!"])
  }, []);
  return <Redirect to='/' />
}

export default Logout;
