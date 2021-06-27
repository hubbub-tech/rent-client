import React from "react";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import EditAccountForm from "../forms/EditAccountForm";

const EditAccount = ({ setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;

  const [user, setUser] = useState({
    "profile": {},
    "address": {}
  });

  useEffect(() => {
    fetch("/accounts/u/edit")
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
            <EditAccountForm user={user} setFlashMessages={setFlashMessages} />
          </div>
        </div>
      </div>
      <br />
    </main>
  );
}

export default EditAccount;
