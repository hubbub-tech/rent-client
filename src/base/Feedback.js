import React from 'react';
import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { AppContext } from '../App';

export const Feedback = () => {
  const location = useLocation();
  const { userId } = useContext(AppContext);

  const [feedback, setFeedback] = useState(null);

  const postData = async(e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_SERVER + '/feedback/submit';
    const body = JSON.stringify({ feedback, href: location.pathname + location.search, userId });

    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <form onSubmit={postData}>
      <div className="row my-3">
        <div className="col-12">
          <h5 id="feedback" className="text-start text-muted">Any Feedback?</h5>
          <div className="form-floating mb-2">
            <textarea
              className="form-control form-control-sm"
              id="feedbackNotes"
              name="feedback"
              placeholder="Leave feedback here."
              onChange={e => setFeedback(e.target.value)}
              required
            />
          <label className="text-muted" htmlFor="feedbackNotes">
              <small>How are we doing? Give us your feedback here!</small>
            </label>
          </div>
          <div className="d-grid gap-2">
            <input className="btn btn-hubbub" type="submit" value="Give Feedback" />
          </div>
        </div>
      </div>
    </form>
  );
}
