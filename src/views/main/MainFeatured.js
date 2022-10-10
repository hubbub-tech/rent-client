import { MainFeaturedCategory } from './MainFeaturedCategory';

import categoryJpg1 from './assets/category-1.jpg';

export const MainFeatured = () => {
  return (
    <section className="mb-lg-5 mt-lg-5 my-3">
      <div className="container">
      
        <div className="row">
          <div className="col-12 my-3">
            <h3 className="mb-0">Featured Categories</h3>
          </div>
        </div>

        <div className="row">
          <MainFeaturedCategory src={categoryJpg1} />
          <MainFeaturedCategory src={categoryJpg1} />
        </div>

      </div>
    </section>
  );
}
