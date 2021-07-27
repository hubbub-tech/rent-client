import React from 'react';
import { useState, useEffect } from 'react';

import RecoverPassForm from '../forms/RecoverPassForm';

const RecoverPassword = ({ setFlashMessages }) => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Recover Your Password</h1>
          <p className="text-center">Give us your email, and we'll send you the link to reset!</p>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <RecoverPassForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default RecoverPassword;
