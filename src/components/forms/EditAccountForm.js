import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import TextInput from '../inputs/TextInput';
import AddressForm from './AddressForm';
import FormErrors from '../errors/FormErrors';

const EditAccountForm = ({ user, setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;
  const formData = new FormData();

  const addressDisplay = `${user.address.num} ${user.address.street}, ${user.address.city}`;
  const [address, setAddress] = useState(user.address);

  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [payment, setPayment] = useState(user.payment);
  const [bio, setBio] = useState(user.profile.bio);
  const [phone, setPhone] = useState(user.profile.phone);
  const [errors, setErrors] = useState({
    "email": [],
    "payment": [],
    "address": [],
    "server": []
  });

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? `/accounts/u/id=${user.id}` : null;
    return res.json()
  }

  const submit = (e) => {
    e.preventDefault();

    formData.append('bio', bio === "" ? null : bio);
    formData.append('phone', phone === "" ? null : phone);
    formData.append('email', email === "" ? null : email);
    formData.append('payment', payment === "" ? null : payment);

    formData.append('address_num', address.num);
    formData.append('address_street', address.street);
    formData.append('address_apt', address.apt);
    formData.append('address_zip', address.zip_code);
    formData.append('address_city', address.city);
    formData.append('address_state', address.state);

    formData.append('image', selectedFile);

    fetch('/accounts/u/edit/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);

      if (redirectUrl) {
        history.push(redirectUrl);
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
          <TextInput
            id="floatingEmail"
            name="email"
            label="Email"
            placeholder={user.email}
            onChange={e => {
              setEmail(e.target.value);
              if(e.target.value.includes("@")) {
                setErrors({ ...errors, email: [] });
              } else {
                setErrors({ ...errors, email: ["Please enter a valid email address."] });
              }
            }}
            minLength="1"
            maxLength="100"
          />
          <FormErrors errors={errors.email} color={"red"} />
          <small className="card-text">
            <font size="-1">Is this address active for deliveries: {addressDisplay}?</font>
          </small>
          <AddressForm address={address} setAddress={setAddress} />
          <TextInput
            id="floatingPayment"
            name="payment"
            label="Payment"
            placeholder={user.payment}
            onChange={e => {
              setPayment(e.target.value);
              if(e.target.value.includes("@")) {
                setErrors({ ...errors, payment: [] });
              } else {
                setErrors({ ...errors, payment: ["Please include the '@' as the first character of your Venmo."] });
              }
            }}
            minLength="1"
            maxLength="100"
          />
          <FormErrors errors={errors.payment} color={"red"} />
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="floatingInputPhone"
              name="phone"
              placeholder={user.profile.phone}
              onChange={e => setPhone(e.target.value)}
              minLength="10"
              maxLength="20"
            />
            <label htmlFor="floatingInputPhone">Phone Number</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingBio"
              name="bio"
              placeholder={user.profile.bio}
              onChange={e => setBio(e.target.value)}
            />
          <label htmlFor="floatingBio"> Your Bio</label>
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
