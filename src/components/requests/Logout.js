import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  fetch(process.env.REACT_APP_SERVER + '/logout')
  return <Redirect to='/' />
}

export default Logout;
