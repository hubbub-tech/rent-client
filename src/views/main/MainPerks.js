import { MainPerksItem } from './MainPerksItem';

import iconSvg from './assets/clock.svg';

export const MainPerks = () => {
  return (
    <section className="my-5">
      <div className="container">
        <div className="row">
          <MainPerksItem src={iconSvg} />
          <MainPerksItem src={iconSvg} />
          <MainPerksItem src={iconSvg} />
          <MainPerksItem src={iconSvg} />
        </div>
      </div>
    </section>
  );
}
