import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import AddressForm from './AddressForm';
import FormErrors from '../errors/FormErrors';

const RegisterForm = ({ setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;

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
  const [profile, setProfile] = useState({"phone": null});
  const [errors, setErrors] = useState({
    "email": [],
    "password": [],
    "address": [],
    "server": []
  });

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? '/login': null;
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
      if (redirectUrl) {
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
          <div className="row">
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFirstName"
                  name="user[firstName]"
                  placeholder="Alexander"
                  onChange={e => setUser({ ...user, firstName: e.target.value })}
                  minLength="1"
                  maxLength="49" required />
                <label htmlFor="floatingInputFirstName">First Name</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputLastName"
                  name="user[lastName]"
                  placeholder="Hamilton"
                  onChange={e => setUser({ ...user, lastName: e.target.value })}
                  minLength="1"
                  maxLength="49" required />
                <label htmlFor="floatingInputLastName">Last Name</label>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInputEmail"
              name="user[email]"
              placeholder="ah1754@columbia.edu"
              onChange={e => {
                  setUser({ ...user, email: e.target.value });
                  if(e.target.value.includes("@")) {
                    setErrors({ ...errors, email: [] });
                  } else {
                    setErrors({ ...errors, email: ["Please enter a valid email address."] });
                  }
                }
              }
              minLength="5"
              maxLength="49" required />
            <label htmlFor="floatingInputEmail">Email address</label>
          </div>
          <FormErrors errors={errors.email} color={"grey"} />
          <AddressForm address={address} setAddress={setAddress} />
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="floatingInputPhone"
              name="profile[phone]"
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
              minLength="10"
              maxLength="20" required />
            <label htmlFor="floatingInputPhone">Phone Number</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInputPayment"
              name="user[payment]"
              onChange={e => setUser({ ...user, payment: e.target.value })}
              minLength="1"
              maxLength="49" required />
            <label htmlFor="floatingInputPayment">Venmo</label>
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
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPasswordConfirmation"
              name="user[confirm]"
              onChange={e => {
                  setUser({ ...user, confirm: e.target.value });
                  if(e.target.value === user.password) {
                    setErrors({ ...errors, password: [] });
                  } else {
                    setErrors({ ...errors, password: ["Your passwords do not match."] });
                  }
                }
              }
              minLength="1"
              maxLength="49" required />
            <label htmlFor="floatingPasswordConfirmation">Confirm Password</label>
          </div>
          <small className="card-text">
            <font size="-1">
              Passwords must have at least 8 characters with at least 1 number.
            </font>
          </small>
          <FormErrors errors={errors.password} color={"red"} />
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1" required />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Yes, I have read and agree to the terms outlined in the
              <Link to="https://docs.google.com/document/d/1rRKafml--o5q6L3HA8EtFHCedQTncR8rUZhAeVsEqfI/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"> Community Guidelines Agreement</Link>.
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
