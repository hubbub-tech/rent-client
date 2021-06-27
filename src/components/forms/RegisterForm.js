import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import AddressForm from './AddressForm';
import FormErrors from '../errors/FormErrors';

const RegisterForm = ({ setFlashMessages }) => {
  let history = useHistory();
  let statusOK;

  const [hasVenmo, setHasVenmo] = useState(true);

  const [user, setUser] = useState({
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "confirm": null,
    "payment": null
  });
  const [address, setAddress] = useState({
    "num": null,
    "street": null,
    "apt": "",
    "city": "New York",
    "state": "NY",
    "zip": null
  });
  const [profile, setProfile] = useState({
    "phone": null
  });
  const [errors, setErrors] = useState({
    "email": [],
    "password": [],
    "address": [],
    "server": []
  });

  const handleEmailOnChange = (e) => {
    setUser({ ...user, email: e.target.value });
    if(e.target.value.includes("@")) {
      setErrors({ ...errors, email: [] });
    } else {
      setErrors({ ...errors, email: ["Please enter a valid email address."] });
    }
  }

  const handlePasswordOnChange = (e) => {
    setUser({ ...user, confirm: e.target.value });
    if(e.target.value === user.password) {
      setErrors({ ...errors, password: [] });
    } else {
      setErrors({ ...errors, password: ["Your passwords do not match."] });
    }
  }

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault()
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ user, profile, address }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push("/login");
      } else {
        setErrors({ ...errors, server: data.errors });
      }
    });
  }
  return (
    <form onSubmit={submit}>
      <div className="card mx-sm-auto mx-2" style={{"maxWidth": "540px"}}>
        <div className="step-1 card-body">
          <FormErrors errors={errors.server} color={"red"} />
          <div className="row">
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="newUserFirstName"
                  name="firstName"
                  placeholder="Alexander"
                  onChange={e => setUser({ ...user, firstName: e.target.value })}
                  minLength="1"
                  maxLength="45"
                  required
                />
                <label htmlFor="newUserFirstName">First Name</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="newUserLastName"
                  name="lastName"
                  placeholder="Hamilton"
                  onChange={e => setUser({ ...user, lastName: e.target.value })}
                  minLength="1"
                  maxLength="45"
                  required
                />
                <label htmlFor="newUserLastName">Last Name</label>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="newUserEmail"
              name="email"
              placeholder="ah1754@columbia.edu"
              onChange={handleEmailOnChange}
              minLength="5"
              maxLength="49"
              required
            />
            <label htmlFor="newUserEmail">Email address</label>
          </div>
          <FormErrors errors={errors.email} color={"grey"} />
          <AddressForm address={address} setAddress={setAddress} required={true} />

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="newUserPhone"
              name="phone"
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
              minLength="10"
              maxLength="20"
              required
            />
            <label htmlFor="newUserPhone">Phone</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              name="venmoNotice"
              id="hasVenmo"
              type="checkbox"
              checked={hasVenmo}
              onChange={e => setHasVenmo(!hasVenmo)}
            />
            <label className="form-check-label" htmlFor="venmoNotice">
              Do you have a Venmo?
            </label>
          </div>
          {hasVenmo &&
            <div className="input-group mb-3">
              <span className="input-group-text" id="atSign">@</span>
              <input
                type="text"
                className={`form-control ${!user.payment ? 'is-invalid': ''}`}
                id="newUserVenmo"
                name="userVenmo"
                placeholder="myVenmo"
                onChange={e => setUser({ ...user, payment: e.target.value })}
                minLength="1"
                maxLength="49"
                aria-describedby="atSign"
                required={hasVenmo}
              />
            </div>
          }

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="newUserPassword"
              name="userPassword"
              onChange={e => setUser({ ...user, password: e.target.value })}
              minLength="8"
              maxLength="49"
              required
            />
            <label htmlFor="newUserPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="passConfirmation"
              name="passConfirmation"
              onChange={handlePasswordOnChange}
              minLength="1"
              maxLength="49"
              required
            />
            <label htmlFor="passConfirmation">Confirm Password</label>
          </div>

          <small className="card-text">
            <font size="-1">
              Passwords must have at least 8 characters with at least 1 number.
            </font>
          </small>
          <FormErrors errors={errors.password} color={"red"} />
          <div className="form-check mt-3">
            <input
              type="radio"
              className="form-check-input"
              name="communityGuidelines"
              id="communityGuidelinesDial"
              required
            />
            <label className="form-check-label" htmlFor="communityGuidelinesDial">
              <span>Yes, I have read and agree to the terms outlined in the </span>
              <Link
                to="https://docs.google.com/document/d/1rRKafml--o5q6L3HA8EtFHCedQTncR8rUZhAeVsEqfI/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Community Guidelines Agreement
              </Link>.
            </label>
          </div>
          <br />
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' />
          </div>
          <br />
          <p className="card-text">Already on Hubbub? Log in <Link to="/login">here</Link>!</p>
          <FormErrors errors={errors.server} color={"red"} />
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
