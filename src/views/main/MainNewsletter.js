import { useState, useEffect, useContext } from 'react';

import ReCAPTCHA from "react-google-recaptcha";

import { FlashContext } from '../../providers/FlashProvider';

export const MainNewsletter = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  const { addFlash, removeFlash } = useContext(FlashContext);

  const renderFlash = async(message, status, timeout = 1000) => {
    addFlash({ message, status });
    setTimeout(() => removeFlash(), timeout);
  };

  const subscribe = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name, email, token }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';

      renderFlash(data.message, status, 10000);
    };

    postData(process.env.REACT_APP_SERVER + '/newsletter/join')
    .catch(console.error);
  };

  return (
    <div className="row mt-5">
      <div className="col-sm-9 col mx-auto">
        <h1 className="text-center mb-3"><span className="text-hubbub">Stay in the Loop</span></h1>
        <form onSubmit={subscribe}>
          <div className="mb-3">
            <label htmlFor="newsletterName" className="form-label">Your Name</label>
            <input
              className="form-control border-dark"
              type="text"
              name="name"
              id="newsletterName"
              onChange={e => setName(e.target.value)}
              required
            />

          </div>
          <div className="mb-3">
            <label htmlFor="newsletterEmail" className="form-label">Your Email</label>
            <input
              className="form-control border-dark"
              type="email"
              name="email"
              aria-label="you@example.com"
              onChange={e => setEmail(e.target.value)}
              aria-describedby="newsletter-email"
              required
            />

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
