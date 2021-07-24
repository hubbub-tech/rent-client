import React from "react";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAnalytics } from '../base/GoogleTags';
import EditAccountForm from "../forms/EditAccountForm";

const EditAccount = ({ cookies, setFlashMessages }) => {
  const location = useLocation();
  useAnalytics(location.pathname);

  const [user, setUser] = useState({
    "profile": {},
    "address": {}
  });

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
      <h1 className="text-center">Edit Your Account</h1>
      <div className="container" style={{"maxWidth": "900px"}}>
        <div className="row justify-content-md-center">
          <div className="col-lg-4">
            <h5>Instructions</h5>
            <p>
              Enter the information that you would like to enter. This profile is meant
              to increase trust in Hubbub Buds :)! All of these fields are optional and you
              can leave them unedited.
            </p>
          </div>
          <div className="col-lg-8">
            <EditAccountForm user={user} cookies={cookies} setFlashMessages={setFlashMessages} />
          </div>
        </div>
      </div>
      <br />
    </main>
  );
}

export default EditAccount;
