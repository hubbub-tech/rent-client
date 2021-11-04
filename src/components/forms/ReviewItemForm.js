import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import RatingInput from '../inputs/RatingInput';

const ReviewItemForm = ({ item, setFlashMessages }) => {
  let statusOK;

  const history = useHistory();
  const formData = new FormData();

  const [body, setBody] = useState(null);
  const [rating, setRating] = useState(null);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault()
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/accounts/o/review/submit`, {
      method: 'POST',
      body: JSON.stringify({
        hubbubId,
        hubbubToken,
        body,
        rating,
        "itemId": item.id,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.flashes);
      history.push('/accounts/u/orders');
    });
    window.scrollTo(0, 0);
  }

  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label" htmlFor="changeReviewBody">Notes</label>
            <textarea
              className="form-control"
              id="changeReviewBody"
              name="reviewBody"
              placeholder="Tell us how it went--for the future renters :)"
              onChange={e => setBody(e.target.value)}
            />
          <div id="reviewHelp" className="form-text">How was the rental? Was the item what you expected?</div>
          </div>
          <RatingInput
            rating={rating}
            setRating={setRating}
            label={"Tell us about your experience!"}
          />
          <div className="d-grid gap-2">
            <input className="btn btn-outline-success" type='submit' value='Submit' />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewItemForm;
