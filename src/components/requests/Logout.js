import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  fetch('/logout').then(res => res.json()).then(data => {
    setIsLoggedIn(data.is_logged_in);
    console.log("isLoggedIn", isLoggedIn)
  });
  return <Redirect to='/' />
}

export default Logout;
