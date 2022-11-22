import { MainBanner } from './MainBanner';
import { MainFeatured } from './MainFeatured';
import { MainPerks } from './MainPerks';
import { MainMission } from './MainMission';

import { MainSecondhandSell } from './MainSecondhandSell';
import { MainRequestItem } from './MainRequestItem';

import sectionBgImg1 from './assets/section-banner-1.png';
import sectionBgImg2 from './assets/section-banner-2.png';

import { DateSearchForm } from '../../inputs/date-search';

export const Index = () => {
  return (
    <main>
      <MainBanner />
      <DateSearchForm />
      <br />
      <MainFeatured />
      <section>
        <div className="container ">
          <div className="row">
            <MainSecondhandSell image={sectionBgImg1} />
            <MainRequestItem image={sectionBgImg2} />
          </div>
        </div>
      </section>
      <MainPerks />
      <MainMission />
    </main>
  );
}
