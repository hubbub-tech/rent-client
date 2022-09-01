import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import EditPassForm from '../forms/EditPassForm';

const EditPassword = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const [user, setUser] = useState({"address": {}, "profile": {}});

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setUser(data.user);
      } else if (statusCode === 403) {
        setFlashMessages(data.messages);
        history.push('/logout');
      }
    });
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
