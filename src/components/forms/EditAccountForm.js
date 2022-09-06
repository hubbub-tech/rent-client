import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNagivate } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const EditAccountForm = ({ user, setFlashMessages }) => {
  let statusOK;
  const history = useNagivate();

  const [hasVenmo, setHasVenmo] = useState(true);
  const [errors, setErrors] = useState({
    "payment": [],
    "server": [],
    "email": [],
    "phone": []
  });

  const [payment, setPayment] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [bio, setBio] = useState(null);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
    if(e.target.value.includes("@")) {
      setErrors({ ...errors, email: [] });
    } else {
      setErrors({ ...errors, email: ["Please enter a valid email address."] });
    }
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + '/accounts/u/edit/submit', {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        payment,
        email,
        phone,
        bio
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);

      if (statusOK) {
        history.push(`/accounts/u/id=${user.id}`);
      } else {
        setErrors({ ...errors, server: data.errors });
      }
    })
    .catch(error => console.log(error));
  }
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card">
        <div className="card-body">
          <FormErrors errors={errors.server} color={"red"} />
          <div className="mb-3">
            <label className="form-label" htmlFor="editUserEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="editUserEmail"
              name="userEmail"
              placeholder={user.email}
              onChange={handleEmailOnChange}
              minLength="5"
              maxLength="49"
            />
          </div>
          <FormErrors errors={errors.email} color={"red"} />
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
                className="form-control"
                id="newUserVenmo"
                name="userVenmo"
                placeholder={user.payment}
                onChange={e => setPayment(e.target.value)}
                minLength="1"
                maxLength="49"
                aria-describedby="atSign"
              />
            </div>
          }
          <FormErrors errors={errors.payment} color={"red"} />
          <div className="mb-3">
            <label className="form-label" htmlFor="editUserPhone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="editUserPhone"
              name="phone"
              placeholder={user.profile.phone}
              onChange={e => setPhone(e.target.value)}
              minLength="10"
              maxLength="20"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="editUserBio"> Your Bio</label>
            <textarea
              className="form-control"
              id="editUserBio"
              name="userBio"
              placeholder={user.profile.bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <input
              className="btn btn-outline-success"
              type='submit'
              value='Submit'
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditAccountForm;
