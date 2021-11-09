import React from 'react';
import { useState, useEffect } from 'react';

import ReCAPTCHA from "react-google-recaptcha";

const NewsletterForm = ({ setFlashMessages }) => {
  let statusOK;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/newsletter/join', {
      method: 'POST',
      body: JSON.stringify({ name, email, token }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
    window.scrollTo(0, 0);
  }
  return (
    <div className="row mt-5">
      <div className="col-sm-9 col mx-auto">
        <h3 className="text-center mb-0">Subscribe to our</h3>
        <h1 className="text-center mb-3"><span className="text-hubbub">Newsletter</span></h1>
        <form onSubmit={submit}>
          <div className="form-floating mb-3">
            <input
              className="form-control border-dark"
              type="text"
              name="name"
              id="newsletterName"
              onChange={e => setName(e.target.value)}
              required
            />
            <label htmlFor="newsletterName">Your Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control border-dark"
              type="email"
              name="email"
              aria-label="you@example.com"
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
              aria-describedby="newsletter-email"
              required
            />
            <label htmlFor="newsletterEmail">Your Email</label>
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_API_KEY}
            onChange={(token) => setToken(token)}
            onExpired={e => setToken(null)}
            className="mb-3 mx-3"
          />
          <div className="d-grid gap-2">
            <input
              className="btn btn-dark"
              type='submit'
              value='Join'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsletterForm;
