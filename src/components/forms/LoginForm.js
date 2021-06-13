import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const LoginForm = ({ setIsLoggedIn, setFlashMessages }) => {
  let history = useHistory();
  const [user, setUser] = useState({"email": null, "password": null});
  const [errors, setErrors] = useState([]);

  const submit = (e) => {
    e.preventDefault()
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setIsLoggedIn(data.is_logged_in);
          setFlashMessages(data.flashes);
          history.push('/');
        });
      } else {
        res.json().then(data => {
          setErrors(data.errors)
        });
      }
    });
  }
  return (
    <form onSubmit={submit} >
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <FormErrors errors={errors} color={"red"} />
          <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="user[email]"
                placeholder="ah1754@columbia.edu"
                onChange={e => setUser({ ...user, email: e.target.value })}
                minLength="1"
                maxLength="49" required />
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="user[password]"
              onChange={e => setUser({ ...user, password: e.target.value })}
              minLength="8"
              maxLength="49" required />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="d-grid gap-2">
            <button
              className="next-step-2 btn btn-primary"
              type='submit'
              value='Submit'>Submit</button>
          </div>
          <p></p>
          <small className="card-text">
            <font size="-1">
              Not on Hubbub yet? Sign up <Link to="/register">here</Link>!
              Or forgot your password? Get some help <Link to="/password/recovery">here</Link>!
            </font>
          </small>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
