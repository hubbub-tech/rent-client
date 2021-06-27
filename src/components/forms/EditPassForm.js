import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const EditPassForm = ({ user, setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;

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
    redirectUrl = res.ok ? `/accounts/u/id=${user.id}` : null;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    fetch('/accounts/u/password/submit', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      if (redirectUrl) {
        setFlashMessages(data.flashes);
        history.push(redirectUrl);
      } else {
        setErrors({ ...errors, server: data.errors });
      }
    });
  }
  return (
    <form onSubmit={submit} >
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="step-1 card-body">
          <FormErrors errors={errors.server} color={"red"} />
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingOldPassword"
              name="user[password]"
              onChange={e => setPassword({ ...password, old:  e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="floatingOldPassword">Old Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingNewPassword"
              name="user[password]"
              onChange={e => setPassword({ ...password, new:  e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="floatingNewPassword">New Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              name="user[confirm]"
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
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>
          <small className="card-text my-3">
            <font size="-1">
              Passwords must have at least 8 characters with at least 1 number.
            </font>
          </small>
          <FormErrors errors={errors.client} color={"red"} />
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' />
          </div>
        </div>
      </div>

    </form>
  );
}

export default EditPassForm;
