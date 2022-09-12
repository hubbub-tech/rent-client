export const ItemReview = () => {
  return (
    <div class="d-flex border-bottom pb-6 mb-6 pt-4">
      <!-- img --><img src="../assets/images/avatar/avatar-8.jpg" alt=""
        class="rounded-circle avatar-lg">
      <div class="ms-5 flex-grow-1">
        <h6 class="mb-1">
          Sandra Langevin

        </h6>
        <!-- content -->
        <p class="small"> <span class="text-muted">8 December 2022</span>
          <span class="text-danger ms-3 fw-bold">Unverified Purchase</span></p>
        <!-- rating -->
        <div class=" mb-2">
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star text-warning"></i>
          <span class="ms-3 text-dark fw-bold">Great product</span>
        </div>

        <p>Great product & package. Delivery can be expedited. </p>
      </div>
    </div>
  );
}
