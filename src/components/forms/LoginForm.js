import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
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
          <TextInput
            id="floatingInput"
            name="user[email]"
            label="Email"
            placeholder="ah1754@columbia.edu"
            onChange={e => setUser({ ...user, email: e.target.value })}
            minLength="1"
            maxLength="49"
            required={true}
          />
          <PasswordInput
            id="floatingPassword"
            name="user[password]"
            label="Password"
            placeholder="ah1754@columbia.edu"
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <div className="d-grid gap-2">
            <button
              className="next-step-2 btn btn-primary"
              type='submit'
              value='Submit'>
              Submit
            </button>
          </div>
          <p></p>
          <small className="card-text">
            <font size="-1">
              Not on Hubbub yet? Sign up <a href="/register">here</a>!
              Or forgot your password? Get some help <a href="/password/recovery">here</a>!
            </font>
          </small>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
