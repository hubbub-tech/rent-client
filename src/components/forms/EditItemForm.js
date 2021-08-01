import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const EditItemForm = ({ item, cookies, setFlashMessages }) => {
  const history = useHistory();
  let statusOK;
  const formData = new FormData();

  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.details.description);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');

    formData.append('hubbubId', hubbubId);
    formData.append('hubbubToken', hubbubToken);

    formData.append('itemId', item.id);
    formData.append('image', selectedFile);

    if (typeof price === 'undefined') {
      formData.append('price', item.price);
    } else {
      formData.append('price', price);
    }

    if (description === null) {
      formData.append('description', item.details.description);
    } else {
      formData.append('description', description);
    }

    fetch(process.env.REACT_APP_SERVER + '/accounts/i/edit/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      if (statusOK) {
        history.push(`/accounts/u/id=${item.lister_id}`);
      }
    })
    .catch(error => console.log(error));
  }
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label" htmlFor="changeItemPrice">Retail Price (USD)</label>
            <input
              type="number"
              className="form-control"
              id="changeItemPrice"
              name="itemPrice"
              step="0.01"
              placeholder={item.price}
              onChange={e => setPrice(e.target.value)}
              min="1.00"
              max="1000.00"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="changeItemDescription">Item Description</label>
            <small className="card-text">
              <font size="-1">
                The more descriptive you are, the more customers you'll bring in!
              </font>
            </small>
            <textarea
              className="form-control"
              id="changeItemDescription"
              name="itemDescription"
              placeholder={item.details.description}
              onChange={e => setDescription(e.target.value)}
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

export default EditItemForm;
