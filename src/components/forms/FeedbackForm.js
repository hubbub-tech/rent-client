import React from 'react';
import { useState, useEffect } from 'react';

const FeedbackForm = ({ setFlashMessages, href }) => {
  const [feedback, setFeedback] = useState(null);
  let statusOK;

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/feedback/submit', {
      method: 'POST',
      body: JSON.stringify({ feedback, href }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
    setFeedback(null);
    window.scrollTo(0, 0);
  }
  return (
    <form onSubmit={submit}>
      <div className="row my-3">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h5 className="text-start text-muted">Any Feedback?</h5>
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
              <font size="-1">How are we doing? Give us your feedback here!</font>
            </label>
          </div>
          <div className="d-grid gap-2">
            <input className="btn btn-hubbub" type="submit" value="Submit" />
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </form>
  );
}

export default FeedbackForm;
