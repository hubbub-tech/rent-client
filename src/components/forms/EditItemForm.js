import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditItemForm = ({ item, setFlashMessages }) => {
  let history = useHistory();
  let redirectUrl;
  const formData = new FormData();

  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.details.description);

  const isStatusOK = (res) => {
    redirectUrl = res.ok ? `/accounts/u/id=${item.lister_id}` : null;
    return res.json()
  }

  const submit = (e) => {
    e.preventDefault();
    formData.append('itemId', item.id);
    formData.append('price', price);
    formData.append('description', description);

    formData.append('image', selectedFile);

    fetch('/accounts/i/edit/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);

      if (redirectUrl) {
        history.push(redirectUrl);
      }
    })
    .catch(error => console.log(error));
  }
  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInputItemPrice"
              name="item[price]"
              step="0.01"
              placeholder={item.price}
              onChange={e => setPrice(e.target.value)}
              min="1.00"
              max="1000.00"
              required
            />
            <label htmlFor="floatingInputItemPrice">Retail Price (USD)</label>
          </div>
          <small className="card-text">
            <font size="-1">
              The more descriptive you are, the more customers you'll bring in!
            </font>
          </small>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingDescription"
              name="details[description]"
              placeholder={item.details.description}
              onChange={e => setDescription(e.target.value)}
            />
            <label htmlFor="floatingDescription">Item Description</label>
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
