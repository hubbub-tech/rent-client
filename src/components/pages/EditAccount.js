import React from "react";
import { useState, useEffect } from 'react';

import EditAccountForm from "../forms/EditAccountForm";

const EditAccount = ({ cookies, setFlashMessages }) => {
  const [user, setUser] = useState({
    "profile": {},
    "address": {}
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setUser(data.user));
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Edit Your Account</h1>
          <div className="col-md-1"></div>
          <div className="col-md-3">
            <h5>Instructions</h5>
            <p>
              Enter the information that you would like to enter. This profile is meant
              to increase trust in Hubbub Buds :)! All of these fields are optional and you
              can leave them unedited.
            </p>
          </div>
          <div className="col-md-7">
            <EditAccountForm user={user} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}

export default EditAccount;
