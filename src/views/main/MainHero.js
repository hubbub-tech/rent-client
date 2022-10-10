import backgroundImg from './assets/main-banner.png';

import { MainHeroBanner } from './MainHeroBanner';

export const MainHero = () => {
  return (
    <section className="mt-5 mb-3">
      <div className="container">
        <div className="hero-slider ">
          <MainHeroBanner image={backgroundImg} />
        </div>
      </div>
    </section>
  );
}
