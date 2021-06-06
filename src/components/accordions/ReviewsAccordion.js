import React import 'react';

const ReviewsAccordion = ({reviews}) => {
  return (
    <div className="row my-3">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <div className="accordion" id="reviewsAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="reviewList">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseList"
                aria-expanded="true"
                aria-controls="collapseList">Reviews from Past Renters</button>
            </h2>
            <div
              id="collapseList"
              className="accordion-collapse collapse show"
              aria-labelledby="reviewList"
              data-bs-parent="#reviewsAccordion">
              {reviews.map((review) => (
                <div className="accordion-body">
                  <p>{{ review.body }}</p>
                  <small>by
                    <a href="/account/u.{{ review.author_id }}"> { review.author_name } </a>
                    on { review.date_created }
                  </small>
                  <hr/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-1"></div>
    </div>
  );
}

export default ReviewsAccordion;
