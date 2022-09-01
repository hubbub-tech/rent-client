import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors'
import AddressForm from './AddressForm';

const EditAddressForm = ({ user, setFlashMessages }) => {
  const history = useHistory();
  let statusOK;

  const [address, setAddress] = useState({
    "num": null,
    "street": null,
    "apt": "",
    "city": "New York",
    "state": "NY",
    "zip": null
  });

  const [errors, setErrors] = useState({
    "client": [],
    "server": []
  });

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + '/accounts/u/address/submit', {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken, address }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setFlashMessages(data.messages);
        history.push(`/accounts/u/id=${user.id}`);
      } else {
        setErrors({ ...errors, server: data.errors });
      }
    });
  }
  return (
    <form onSubmit={submit} >
      <div className="card">
        <div className="card-body">
          <FormErrors errors={errors.server} color={"red"} />
          <AddressForm address={address} setAddress={setAddress} required={true} />
          <FormErrors errors={errors.client} color={"red"} />
          <div className="d-grid gap-2">
            <input
              className="btn btn-outline-success"
              type='submit'
              value='Submit'
              disabled={errors.client.length !== 0}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditAddressForm;
