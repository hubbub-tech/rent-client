import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  fetch('/logout')
  return <Redirect to='/' />
}

export default Logout;
