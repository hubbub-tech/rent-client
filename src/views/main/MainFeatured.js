import { MainFeaturedCategory } from './MainFeaturedCategory';

import categoryLivingImg from './assets/category-1.png';
import categoryKitchenImg from './assets/category-2.png';
import categoryFitnessImg from './assets/category-3.jpeg';
import categoryEntertainmentImg from './assets/category-4.png';
import categoryLightingImg from './assets/category-5.png';
import categoryOutdoorsImg from './assets/category-6.png';

export const MainFeatured = () => {
  return (
    <section className="mb-lg-5 mt-lg-5 my-3">
      <div className="container">

        <div className="row">
          <div className="col-12 my-3">
            <h3 className="mb-0">Featured Categories</h3>
          </div>
        </div>

        <div className="row g-2 my-1">
          <MainFeaturedCategory category={{ name: "Living & Appliances", link: '/items/feed?search=living' }} src={categoryLivingImg} />
          <MainFeaturedCategory category={{ name: "Kitchenware", link: '/items/feed?search=kitchen' }} src={categoryKitchenImg} />
          <MainFeaturedCategory category={{ name: "Fitness & Health", link: '/items/feed?search=fitness' }} src={categoryFitnessImg} />
          <MainFeaturedCategory category={{ name: "Entertainment", link: '/items/feed?search=entertainment' }} src={categoryEntertainmentImg} />
          <MainFeaturedCategory category={{ name: "Lighting", link: '/items/feed?search=lighting' }} src={categoryLightingImg} />

          <MainFeaturedCategory category={{ name: "Outdoors", link: '/items/feed?search=outdoors' }} src={categoryOutdoorsImg} />
        </div>

      </div>
    </section>
  );
}
