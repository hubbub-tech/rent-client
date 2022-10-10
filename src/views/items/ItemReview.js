export const ItemReview = () => {
  return (
    <div className="d-flex border-bottom pb-6 mb-6 pt-4">
      <!-- img --><img src="../assets/images/avatar/avatar-8.jpg" alt=""
        className="rounded-circle avatar-lg">
      <div className="ms-5 flex-grow-1">
        <h6 className="mb-1">
          Sandra Langevin

        </h6>
        <!-- content -->
        <p className="small"> <span className="text-muted">8 December 2022</span>
          <span className="text-danger ms-3 fw-bold">Unverified Purchase</span></p>
        <!-- rating -->
        <div className=" mb-2">
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star-fill text-warning"></i>
          <i className="bi bi-star text-warning"></i>
          <span className="ms-3 text-dark fw-bold">Great product</span>
        </div>

        <p>Great product & package. Delivery can be expedited. </p>
      </div>
    </div>
  );
}
