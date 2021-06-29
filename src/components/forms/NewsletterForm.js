import React from 'react';

const NewsletterForm = () => {
  const submit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="row mt-5">
      <h3 className="text-center">What's all the Hubbub?</h3>
      <div className="container" style={{"maxWidth": "720px"}}>
        <p className="text-center">
          Learn more about our community of people who care about sustainability and affordability.
          Subscribe with your email to follow our newsletter.
        </p>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col mx-auto">
            <form onSubmit={submit}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  aria-label="you@example.com"
                  aria-describedby="button-addon2" required />
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Join</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterForm;
