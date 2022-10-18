import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';

import { RegisterPassInput } from  './RegisterPassInput';
import { FlashContext } from '../../../providers/FlashProvider';


export const RegisterForm = () => {

  let navigate = useNavigate();
  const { addFlash, removeFlash } = useContext(FlashContext);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const disabled = () => {
    if (password === null) return true;
    if (recaptchaToken === null) return true;

    return false;
  }

  const handleRegistration = (e) => {
    e.preventDefault();

    const renderFlash = async(message, status, timeout = 1000) => {
      addFlash({ message, status });
      setTimeout(() => removeFlash(), timeout);
    };

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: {
            firstName,
            lastName,
            email,
            phone,
            password
          },
          recaptchaToken
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      let status = response.ok ? 'success' : 'danger';

      console.log(`Message: ${data.message}` )
      renderFlash(data.message, status, 100000);

      if (response.ok) {
        let configs;
        if (!window.location.href.includes("localhost")) {
          configs = { sameSite: 'lax'}
        } else {
          configs = { domain: '.hubbub.shop', sameSite: 'lax'}
        }

        Cookies.set('userId', data.user_id);
        Cookies.set('sessionToken', data.session_token);

        navigate('/items/feed');
      };
    };

    postData(process.env.REACT_APP_SERVER + '/register')
    .catch(console.error);
  };

  return (
    <form onSubmit={handleRegistration}>
      <div className="mb-3">
        <label htmlFor="userFirstName" className="form-label"><small>First Name</small></label>
        <input
          type="text"
          className="form-control"
          id="userFirstName"
          name="firstName"
          placeholder="Alexander"
          onChange={e => setFirstName(e.target.value)}
          minLength="1"
          maxLength="32"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userLastName" className="form-label"><small>Last Name</small></label>
        <input
          type="text"
          className="form-control"
          id="userLastName"
          name="lastName"
          placeholder="Hamilton"
          onChange={e => setLastName(e.target.value)}
          minLength="1"
          maxLength="32"
          required
        />
      </div>

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
        <label htmlFor="userPhone" className="form-label"><small>Phone</small></label>
        <input
          type="phone"
          className="form-control"
          id="userPhone"
          name="phone"
          onChange={e => setPhone(e.target.value)}
          minLength="9"
          maxLength="20"
          required
        />
      </div>

      <RegisterPassInput setPassword={setPassword} />

      <div className="mt-3">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_API_KEY}
          onChange={token => setRecaptchaToken(token)}
          onExpired={e => setRecaptchaToken(null)}
        />
      </div>

      <div className="d-grid gap-2 my-3">
        <button
          className="next-step-2 btn btn-hubbub"
          type='submit'
          value='Submit'
          disabled={disabled()}
        >
          Sign up
        </button>
      </div>
      <div className="text-center">
        <small>On Hubbub already? <a href="/login">Login</a>!</small>
      </div>
    </form>
  );
}
