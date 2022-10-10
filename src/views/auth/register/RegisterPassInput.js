import { useState } from 'react';

export const RegisterPassInput = ({ setPassword }) => {

  const [privatePassword, setPrivatePassword] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const handlePasswordValidation = (e) => {
    const privateConfirmPassword = e.target.value;

    if (privatePassword === privateConfirmPassword) {
      setErrorMessage(null);
      setPassword(privatePassword);
    } else {
      setErrorMessage("You're password doesn't match.");
    }
  }

  return (
    <div className="mb-3">
      <label htmlFor="userPassword" className="form-label"><small>Password</small></label>
      <input
        type="password"
        className="form-control"
        id="userPassword"
        name="password"
        onChange={e => setPrivatePassword(e.target.value)}
        minLength="8"
        maxLength="49"
        required
      />
      <div id="emailHelp" className="form-text d-flex justify-content-end mb-3">
        Password should be at least 8 characters.
      </div>
      <input
        type="password"
        className="form-control"
        id="userConfirmPassword"
        name="confirmPassword"
        placeholder="Confirm password"
        onChange={handlePasswordValidation}
        minLength="8"
        maxLength="49"
        required
      />
      {(privatePassword !== null && errorMessage !== null) &&
        <div id="matchEmailHelp" className="form-text d-flex text-danger justify-content-end">
          { errorMessage }
        </div>
      }
    </div>
  );
}
