import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

export const LoginForm = () => {

  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const postData = async(e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_SERVER + '/login';

    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      let configs;
      if (!window.location.href.includes("localhost")) {
        configs = { sameSite: 'lax' }
      } else {
        configs = { domain: '.hubbub.shop', sameSite: 'lax' }
      }

      Cookies.set('userId', data.user_id, configs);
      Cookies.set('sessionToken', data.session_token, configs);

      navigate('/');
    };
  }

  return (
    <form onSubmit={postData}>
      <div className="mb-3">
        <label htmlFor="userEmail" className="form-label"><small>Email</small></label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          name="email"
          placeholder="ah1754@columbia.edu"
          onChange={e => setEmail(e.target.value)}
          minLength="5"
          maxLength="49"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userPassword" className="form-label"><small>Password</small></label>
        <input
          type="password"
          className="form-control"
          id="userPassword"
          name="password"
          onChange={e => setPassword(e.target.value)}
          minLength="8"
          maxLength="49"
          required
        />
        <div id="emailHelp" className="form-text d-flex justify-content-end">
          <a href="/password/recovery">Forgot password?</a>
        </div>
      </div>
      <div className="d-grid gap-2 mb-3">
        <button
          className="next-step-2 btn btn-hubbub"
          type='submit'
          value='Submit'
        >
          Sign in
        </button>
      </div>
      <div className="text-center">
        <small>Not on Hubbub yet? <a href="/register">Sign up</a>!</small>
      </div>
    </form>
  );
}
