import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ResetPassForm from '../forms/ResetPassForm';

const ResetPassword = ({ setFlashMessages }) => {
  const { resetToken } = useParams();
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Reset Your Password</h1>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <ResetPassForm resetToken={resetToken} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
