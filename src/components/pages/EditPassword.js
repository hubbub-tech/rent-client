import React from 'react';
import { useState, useEffect } from 'react';

import EditPassForm from '../forms/EditPassForm';

const EditPassword = ({ setFlashMessages }) => {
  const [user, setUser] = useState({"address": {}, "profile": {}});
  const [urlBase, setUrlBase] = useState(null);

  useEffect(() => {
    fetch("/accounts/u/edit")
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      setUrlBase(data.photo_url);
    });
  }, []);
  return (
    <main>
      <br />
      <h1 className="text-center">Change Password</h1>
      <br />
        <div className="container" style={{"maxWidth": "900px"}}>
          <div className="row justify-content-md-center">
            <div className="col-lg-8">
              <EditPassForm user={user} setFlashMessages={setFlashMessages} />
            </div>
          </div>
        </div>
      <br />
    </main>
  );
}

export default EditPassword;
