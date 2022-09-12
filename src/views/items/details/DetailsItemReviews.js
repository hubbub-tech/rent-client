export const DetailsItemReviews = () => {
  return (
    <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
      <div class="my-8">
        <div className="row">
          <ItemReviewSummary />
          <div className="col-md-8">
            <div className="mb-10">
              <div className="d-flex justify-content-between align-items-center mb-8">
                <div>
                  <!-- heading -->
                  <h4>Reviews</h4>
                </div>
                <div>
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Top Review</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                {reviews.map((review) => (
                  <ItemReview key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
