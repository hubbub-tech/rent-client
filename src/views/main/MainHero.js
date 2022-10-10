import { MainHeroBanner } from './MainHeroBanner';

export const MainHero = () => {
  return (
    <section className="mt-5 mb-3">
      <div className="container">
        <div className="hero-slider ">
          <MainHeroBanner background={"#69eb67"} />
        </div>
      </div>
    </section>
  );
}
