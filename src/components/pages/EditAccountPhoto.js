import React from "react";
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ProfilePhoto from '../icons/ProfilePhoto';
import EditAccountPhotoForm from "../forms/EditAccountPhotoForm";

const EditAccountPhoto = ({ setFlashMessages }) => {
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
  const [urlBase, setUrlBase] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setUser(data.user);
        setUrlBase(data.photo_url);
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
          <h1 className="text-center mb-3">Change Your Account Photo</h1>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <ProfilePhoto urlBase={urlBase} user={user} size="200px" />
            <p className="text-center mt-3">This profile is meant to increase trust in Hubbub Buds :)!</p>
            <EditAccountPhotoForm user={user} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </main>
  );
}

export default EditAccountPhoto;
