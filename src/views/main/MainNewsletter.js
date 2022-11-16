import { useState, useCallback, useEffect, useContext } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { FlashContext } from '../../providers/FlashProvider';

export const MainNewsletter = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const recaptchaToken = await executeRecaptcha('yourAction');
    setToken(recaptchaToken);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const { renderFlash } = useContext(FlashContext);

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
          <div className="d-grid gap-2">
            <input
              className="btn btn-dark"
              onClick={handleReCaptchaVerify}
              type='submit'
              value='Join'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
