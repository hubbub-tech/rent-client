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
      <h3 className="text-center">What's all the Hubbub?</h3>
      <div className="container-md">
        <p className="text-center">
          Learn more about our community of people who care about sustainability and affordability.
          Subscribe with your email to follow our newsletter.
        </p>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col mx-auto">
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
                className="mb-3 mx-4"
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
      </div>
    </div>
  );
}

export default NewsletterForm;
