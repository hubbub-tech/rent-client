import React from 'react';
import { useState, useEffect } from 'react';

import EditPassForm from '../forms/EditPassForm';

const EditPassword = ({ setFlashMessages }) => {
  const [user, setUser] = useState({"address": {}, "profile": {}});

  useEffect(() => {
    fetch("/accounts/u/edit")
    .then(res => res.json())
    .then(data => setUser(data.user));
  }, []);
  return (
    <main>
      <br />
      <h1 className="text-center">Change Password</h1>
      <br />
        <div className="container-md">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <EditPassForm user={user} setFlashMessages={setFlashMessages} />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      <br />
    </main>
  );
}

export default EditPassword;
