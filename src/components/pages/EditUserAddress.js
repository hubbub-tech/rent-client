import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import EditAddressForm from '../forms/EditAddressForm';

const EditUserAddress = ({ setFlashMessages }) => {
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
  const addressDisplay = `${user.address.num} ${user.address.street} ${user.address.apt !== '' ? `Apt ${user.address.apt}` : ''}, ${user.address.city}, ${user.address.state} ${user.address.zip_code}`;

  useEffect(() => {
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + "/accounts/u/edit", {
      credentials: 'include'
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
            <EditAddressForm user={user} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default EditUserAddress;
