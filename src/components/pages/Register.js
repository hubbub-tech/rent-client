import React from 'react';
import { Redirect } from 'react-router-dom';

import RegisterForm from '../forms/RegisterForm';

const Register = ({isLoggedIn}) => {
  if (!isLoggedIn) {
    return (
      <main>
        <br />
        <h1 className="text-center">Sign Up</h1>
        <p className="text-center">Join the revolution in ownership.</p>
        <br />
        <RegisterForm />
        <br />
      </main>
    );
  } else {
    return <Redirect to="/login" />
  }
}

export default Register;
