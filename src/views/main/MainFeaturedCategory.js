export const MainFeaturedCategory = ({ category, src }) => {
  return (
    <div className="col-lg-2 col-md-3 col-6">
      <a href={ category.link } className="text-decoration-none text-dark">
        <div className="card card-product mb-lg-4 float">
          <div className="card-body text-center py-8">
            <img src={src} alt={ category.name }
              className="mb-3 img-fluid" />
            <div className="text-truncate">{ category.name }</div>
          </div>
        </div>
      </a>
    </div>
  );
}
