import React from 'react';

import LoginForm from '../forms/LoginForm';

const Login = ({ setFlashMessages }) => {
  return (
    <main>
      <br />
      <h1 className="text-center">Login</h1>
      <p className="text-center mx-2">Find the sweet deal that's been waiting for you.</p>
      <br />
      <LoginForm setFlashMessages={setFlashMessages} />
      <br />
    </main>
  );
}

export default Login;
