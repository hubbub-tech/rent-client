import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const EditPassForm = ({ user, setFlashMessages }) => {
  let history = useHistory();
  let statusOK;

  const [password, setPassword] = useState({
    "old": null,
    "new": null,
    "confirm": null
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
    fetch(process.env.REACT_APP_SERVER + '/accounts/u/password/submit', {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setFlashMessages(data.flashes);
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
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="oldUserPassword"
              name="oldPassword"
              onChange={e => setPassword({ ...password, old:  e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="oldUserPassword">Old Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="newUserPassword"
              name="newPassword"
              onChange={e => setPassword({ ...password, new:  e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="newUserPassword">New Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="ConfirmUserPass"
              name="ConfirmPass"
              onChange={e => {
                  setPassword({ ...password, confirm:  e.target.value });
                  if(e.target.value === password.new) {
                    setErrors({ ...errors, client: [] });
                  } else {
                    setErrors({ ...errors, client: ["Your passwords do not match."] });
                  }
                }
              }
              minLength="1"
              maxLength="49"
              required
            />
            <label htmlFor="ConfirmUserPass">Confirm Password</label>
          </div>
          <small className="card-text my-3">
            <font size="-1">
              Passwords must have at least 8 characters with at least 1 number.
            </font>
          </small>
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

export default EditPassForm;
