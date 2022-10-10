export const MainFeaturedCategory = ({ category, src }) => {
  return (
    <div className="col-6">
      <a href="../pages/shop-grid.html" className="text-decoration-none text-inherit">
        <div className="card card-product mb-lg-4">
          <div className="card-body text-center py-8">
            <img src={src} alt="Grocery Ecommerce Template"
              className="mb-3 img-fluid" />
            <div className="text-truncate">Dairy, Bread & Eggs</div>
          </div>
        </div>
      </a>
    </div>
  );
}
