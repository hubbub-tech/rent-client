import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from '../forms/LoginForm';

const Login = ({isLoggedIn, setIsLoggedIn, setFlashMessages, setCartSize}) => {
  if (!isLoggedIn) {
    return (
      <main>
        <br />
        <h1 className="text-center">Login</h1>
        <p className="text-center">Find the sweet deal that's been waiting for you.</p>
        <br />
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setFlashMessages={setFlashMessages}
          setCartSize={setCartSize} />
        <br />
      </main>
    );
  } else {
    return <Redirect to="/" />
  }
}

export default Login;
