import { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FlashContext } from '../../providers/FlashProvider';
import { SessionContext } from '../../providers/SessionProvider';

import Cookies from 'js-cookie';

export const FeedbackForm = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [feedbackBody, setFeedbackBody] = useState();

  const { renderFlash } = useContext(FlashContext);
  const { userId } = useContext(SessionContext);

  const postData = async(e) => {
    e.preventDefault();

    const feedbackSlug = searchParams.get("slug");
    const url = process.env.REACT_APP_SERVER + "/feedback";

    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        feedbackBody,
        feedbackSlug: feedbackSlug,
        userId
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    renderFlash(data.message, "info", 10000);
    navigate(feedbackSlug);
  }

  return (
    <form onSubmit={postData}>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="feedbackNotes"
          name="feedback"
          placeholder="Leave feedback here."
          onChange={e => setFeedbackBody(e.target.value)}
          required
        />
      </div>
      <div className="d-grid gap-2 mb-3">
        <button
          className="next-step-2 btn btn-hubbub"
          type='submit'
          value='Submit'
        >
          Send Feedback
        </button>
      </div>
      <div className="text-center">
        <small>Not on Hubbub yet? <a className="hubbub-link" href="/register">Sign up</a>!</small>
      </div>
    </form>
  );
}
