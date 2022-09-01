import React from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const ResetPassForm = ({ resetToken, setFlashMessages }) => {
  let statusOK;
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState({
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
    fetch(process.env.REACT_APP_SERVER + `/password/reset/token=${resetToken}`, {
      method: 'POST',
      body: JSON.stringify({ email, "newPassword": password.new }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setFlashMessages(data.messages);
        history.push(`/login`);
      } else {
        setFlashMessages(data.messages);
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
              type="text"
              className="form-control"
              id="userEmail"
              name="email"
              onChange={e => setEmail(e.target.value)}
              minLength="3"
              maxLength="30"
              required
            />
            <label htmlFor="userEmail">Your Email Address</label>
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

export default ResetPassForm;
