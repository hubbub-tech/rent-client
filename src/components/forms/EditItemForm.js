import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import FormErrors from '../errors/FormErrors';

const EditItemForm = ({ item, cookies, setFlashMessages }) => {
  let statusOK;
  const history = useHistory();

  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.details.description);
  const [errors, setErrors] = useState({
    "price": [],
    "server": [],
    "description": []
  });

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');

    fetch(process.env.REACT_APP_SERVER + '/accounts/i/edit/submit', {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        price,
        description,
        "itemId": item.id
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);

      if (statusOK) {
        history.push(`/accounts/u/id=${item.lister_id}`);
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
          <FormErrors errors={errors.price} color={"red"} />
          <div className="mb-3">
            <label className="form-label" htmlFor="changeItemPrice">Retail Price (USD)</label>
            <input
              type="number"
              className="form-control"
              id="changeItemPrice"
              name="itemPrice"
              step="0.01"
              min="1.00"
              max="1000.00"
              placeholder={item.price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <FormErrors errors={errors.description} color={"red"} />
          <div className="mb-3">
            <label className="form-label" htmlFor="changeItemDescription">Item Description</label>
            <textarea
              className="form-control"
              id="changeItemDescription"
              name="itemDescription"
              placeholder={item.details.description}
              onChange={e => setDescription(e.target.value)}
            />
            <div id="descriptionHelp" className="form-text">The more descriptive you are, the more renters you'll bring in!</div>
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
