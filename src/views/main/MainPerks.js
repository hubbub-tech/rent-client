import { MainPerksItem } from './MainPerksItem';

import calendarSvg from './assets/icons/calendar.svg';
import hourglassSvg from './assets/icons/hourglass.svg';
import personHeartSvg from './assets/icons/person-heart.svg';
import flowerSvg from './assets/icons/flower.svg';

export const MainPerks = () => {
  return (
    <section className="my-5 py-5 hubbub-background">
      <div className="container">
        <div className="row">
          <MainPerksItem
            perk={{
              header: 'Flexible ownership is here',
              description: "Rent for as short as a day or as a day or as long as a year. You can cancel with no problem up to 24 hours before, and you can extend longer in a pinch."
            }}
            src={calendarSvg}
          />
          <MainPerksItem
            perk={{
              header: 'Fast delivery on demand',
              description: "Tell us when and where you need it delivered or picked up, and we'll meet you there."
            }}
            src={hourglassSvg}
          />
          <MainPerksItem
            perk={{
              header: 'Support from Start to Finish',
              description: "We're with you throughout your rental. We're here to help you every step of the way."
            }}
            src={personHeartSvg}
          />
          <MainPerksItem
            perk={{
              header: 'Help end landfill waste',
              description: "We're strongly motivated by a mission to end landfill waste and extend the life of everyday items."
            }}
            src={flowerSvg}
          />
        </div>
      </div>
    </section>
  );
}
