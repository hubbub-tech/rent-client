import React from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const RecoverPassForm = ({ setFlashMessages }) => {
  const { resetToken } = useParams();
  const history = useHistory();
  let statusOK;

  const [email, setEmail] = useState(null);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/password/recovery', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setFlashMessages(data.flashes);
        history.push(`/login`);
      } else {
        setFlashMessages(data.flashes);
      }
    });
  }
  return (
    <form onSubmit={submit} >
      <div className="card">
        <div className="card-body">
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
          <div className="d-grid gap-2">
            <input
              className="btn btn-outline-success"
              type='submit'
              value='Submit'
              disabled={email === null}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecoverPassForm;
