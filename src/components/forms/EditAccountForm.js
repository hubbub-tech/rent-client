import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import TextInput from '../inputs/TextInput';
import AddressForm from './AddressForm';
import FormErrors from '../errors/FormErrors';

const EditAccountForm = ({ user, setFlashMessages }) => {
  const history = useHistory();
  let statusOK;

  const formData = new FormData();
  const [hasVenmo, setHasVenmo] = useState(true);
  const [errors, setErrors] = useState({
    "email": [],
    "payment": [],
    "server": []
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [payment, setPayment] = useState(user.payment);
  const [bio, setBio] = useState(user.profile.bio);
  const [phone, setPhone] = useState(user.profile.phone);

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

    formData.append('hubbubId', hubbubId);
    formData.append('hubbubToken', hubbubToken);

    if (typeof bio === 'undefined') {
      formData.append('bio', user.profile.bio);
    } else {
      formData.append('bio', bio);
    }

    if (typeof phone === 'undefined') {
      formData.append('phone', user.profile.phone);
    } else {
      formData.append('phone', phone);
    }

    if (typeof email === 'undefined') {
      formData.append('email', user.email);
    } else {
      formData.append('email', email);
    }

    if (typeof payment === 'undefined') {
      formData.append('payment', user.payment);
    } else {
      formData.append('payment', payment);
    }

    formData.append('image', selectedFile);

    fetch(process.env.REACT_APP_SERVER + '/accounts/u/edit/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);

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
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
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
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Product Photo (Portrait Ideally)</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              accept="image/*"
              onChange={e => setSelectedFile(e.target.files[0])}
            />
          </div>
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditAccountForm;
