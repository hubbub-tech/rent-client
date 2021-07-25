import React from 'react';
import { useState, useEffect } from 'react';

import EditAddressForm from '../forms/EditAddressForm';

const EditUserAddress = ({ cookies, setFlashMessages }) => {
  const [user, setUser] = useState({
    "profile": {},
    "address": {}
  });
  const addressDisplay = `${user.address.num} ${user.address.street} ${user.address.apt !== '' ? `Apt ${user.address.apt}` : ''}, ${user.address.city}, ${user.address.state} ${user.address.zip_code}`;

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

      <br />
        <div className="container-md">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1 className="text-center">Change Address</h1>
              <p className="text-center">Address on record: <strong className="text-hubbub">{addressDisplay}</strong></p>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <EditAddressForm user={user} cookies={cookies} setFlashMessages={setFlashMessages} />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      <br />
    </main>
  );
}

export default EditUserAddress;
