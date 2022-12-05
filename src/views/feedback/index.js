import { FeedbackForm } from './FeedbackForm';

export const Index = () => {

  return (
    <main>
      <div className="mt-4">
        <div className="container my-5">
          <div className="row mt-5">
            <div className="col-12 mt-5"></div>
          </div>
          <div className="row mx-md-5">

            <div className="col-lg-4 col-md-3 col-1 my-md-5"></div>
            <div className="col-lg-4 col-md-6 col-10 my-md-5 mx-md-3">
              <h1>Leave Feedback</h1>
              <p className="fs-6 mb-4">Tell us how we can do better</p>
              <FeedbackForm />
            </div>
            <div className="col-lg-4 col-md-3 col-1 my-md-5"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
