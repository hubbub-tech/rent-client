import React from 'react';
import { useState, useEffect } from 'react';

import EditPassForm from '../forms/EditPassForm';

const EditPassword = ({ cookies, setFlashMessages }) => {
  const [user, setUser] = useState({"address": {}, "profile": {}});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      method: 'POST',
      body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
      headers: { 'Content-Type': 'application/json' },
    })
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
              <EditPassForm user={user} cookies={cookies} setFlashMessages={setFlashMessages} />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      <br />
    </main>
  );
}

export default EditPassword;
