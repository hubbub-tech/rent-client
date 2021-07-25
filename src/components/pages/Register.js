import React from 'react';

import RegisterForm from '../forms/RegisterForm';

const Register = ({ setFlashMessages }) => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Sign Up</h1>
          <p className="text-center">Join the revolution in ownership.</p>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <RegisterForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default Register;
