import React from "react";
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import EditAccountForm from "../forms/EditAccountForm";

const EditAccount = ({ cookies, setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const [user, setUser] = useState({
    "profile": {},
    "address": {}
  });

  useEffect(() => {
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setUser(data.user);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      }
    });
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
