import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const WishlistForm = ({ setFlashMessages }) => {
  let statusOK;
  const history = useHistory();

  const [user, setUser] = useState({"email": null, "password": null});
  const [errors, setErrors] = useState([]);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  useEffect(() => {

  }, [])

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/login', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);
      if (statusOK) {
        let configs;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          configs = { sameSite: 'none', secure: true}
        } else {
          configs = { domain: '.hubbub.shop', sameSite: 'none', secure: true}
        }
        Cookies.set('hubbubToken', data.hubbubToken, configs);
        Cookies.set('hubbubId', data.hubbubId, configs);
        Cookies.set('cartSize', data.cartSize);
        history.push("/");
      } else {
        setErrors(data.errors);
      }
    });
    window.scrollTo(0, 0);
  }

  return (
    <form onSubmit={submit}>
      <div className="card mx-sm-auto mx-2" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <FormErrors errors={errors} color={"red"} />
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="userEmail"
              name="email"
              placeholder="ah1754@columbia.edu"
              onChange={e => setUser({ ...user, email: e.target.value })}
              minLength="5"
              maxLength="49"
              required
            />
            <label htmlFor="userEmail">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="userPassword"
              name="password"
              onChange={e => setUser({ ...user, password: e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="userPassword">Password</label>
          </div>
          <div className="d-grid gap-2 mb-3">
            <button
              className="next-step-2 btn btn-primary"
              type='submit'
              value='Submit'
            >
              Submit
            </button>
          </div>
          <small className="card-text">
            <font size="-1">
              Not on Hubbub yet? Sign up <Link to="/register">here</Link>!
              Or forgot your password? Reset your password <a href="/password/recovery">here</a>!
            </font>
          </small>
        </div>
      </div>
    </form>
  );
}

export default WishlistForm;
