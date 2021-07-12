import React from 'react';
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Faqs = () => {
  useEffect(() => {
    AOS.init({duration : 2000, once: true});
  }, []);
  return (
    <div className="container-md my-5">
      <div className="row my-3">
        <div className="col-12 mb-3">
          <h1 className="text-center display-2">Frequently Asked</h1>
          <p className="text-center fs-5">Got questions?</p>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-8" data-aos="fade-up">
          <img src="../static/backgrounds/faq.jpeg" className="img-fluid rounded" alt="Central Park" />
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="row">
            <h3 className="text-start text-hubbub my-3">Content</h3>
            <div className="list-group mb-5">
              <a className="list-group-item list-group-item-action" href="#about">Intro</a>
              <a className="list-group-item list-group-item-action" href="#renting">Renting</a>
              <a className="list-group-item list-group-item-action" href="#safety">Safety</a>
              <a className="list-group-item list-group-item-action" href="#random">Miscellaneous</a>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="row">
            <h3 id="about" className="text-start text-hubbub my-3">Intro</h3>
            <div className="col-12 my-3">
              <h4 className="text-start">What is Hubbub?</h4>
              <p className="text-start">
                We're a rental marketplace that gets you what you need, whenever
                you need it. You'll be able to rent high quality items from other
                vetted users and list your own items as a way to generate some extra
                revenue for yourself. Hubbub delivers and picks up the items directly
                at your door so you’ll never have to deal with meeting up with strangers
                or moving your stuff. Our goal is to save you money, make your life
                significantly easier, and eliminate consumer waste.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">How does Hubbub work?</h4>
              <p className="text-start">
                On our marketplace platform, you'll be able to browse the wide array
                of listed items for whatever you need. You then proceed to book the
                items for the amount of time that works best for you (days/weeks/months)
                and then select a delivery location and time. We go pick up the listed
                item, verify its quality, sanitize it, and then drop it off. When your
                rental period is over, we come back to get it from you. Easy peasy!
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">Why use Hubbub?</h4>
              <p className="text-start">
                Use Hubbub to access the items you need but don’t necessarily want
                to hold on to forever. We offer a wide range of high quality inventory
                that is listed at a fraction of retail price and is delivered and
                picked up when most convenient for you. This reduces the negative
                environmental impact of modern consumerism and saves you time and money
                that you can put towards things that matter most to you!
              </p>
              <p className="text-start">
                To keep things as simple as possible for the user, we verify personal
                profiles and listings to maintain a trusted marketplace that ensures
                you can know exactly what you’re paying for. No more uncomfortable interactions
                and awkward exchanges of money for secondhand items that may or may
                not match what the seller advertised. We’ve designed Hubbub to eliminate
                all the pain points that have historically left the renting and secondhand
                goods industry with a negative reputation and have driven consumers to
                big online retailers for disposable goods.
              </p>
            </div>
          </div>
          <div className="row">
            <h3 id="renting" className="text-start text-hubbub my-3">Renting & Listing</h3>
            <div className="col-12 my-3">
              <h4 className="text-start">What does it cost?</h4>
              <p className="text-start">
                All of the items are listed at a fraction of retail prices,
                depending on the item and length of rental period. We hate delivery/pick-up fees,
                so that'll be free. We charge a 25% deposit to cover renters, listers,
                and us in case of any loss or damage beyond reasonable wear and tear.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">What can I get on Hubbub?</h4>
              <p className="text-start">
                On the platform, you'll be able to find school and home essentials
                and extras like mini-fridges, lights, fans/heaters, kitchen supplies,
                iClickers/calculators, textbooks, storage accessories, games/outdoor
                gear, exercise equipment, projectors, TV's, speakers, camera/video
                gear, decor, and tools. Pretty much anything that you’d ideally be
                able to use and access but are less thrilled about owning forever
                or later needing to decide between moving/storing it, trying to
                sell it, and throwing it out.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">How do I get the item?</h4>
              <p className="text-start">
                We deliver wherever, whenever works best for you. When you finish
                selecting the items you want, you indicate your availability to have
                them delivered. Similar to if you’re ordering grocery delivery.
                Delivery will at most be within 2 days of placing the order, barring
                any exceptional circumstances beyond the control of the Hubbub Team.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">Who can use Hubbub?</h4>
              <p className="text-start">
                Hubbub is currently servicing students and alumni from Columbia and
                NYU only. We're expanding to other community “Hubs" throughout NYC
                in the near future to further broaden the items that appear on
                the platform while making sure our delivery is fast and sustainable.
                We’re looking to expand to other NYC students by the winter. If you
                want Hubbub at your school, send us a message through our socials
                or through the “Contact Us” link below!
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">What are the requirements to rent from Hubbub?</h4>
              <p className="text-start">
                We ask everyone who uses Hubbub for a few pieces of information.
                This info helps make sure only trusted users are on the platform.
                Hubbub's requirements for renters include: Full name. Email address.
                Confirmed phone number. Introductory message and agreement to
                Marketplace conduct rules. You'll also be able to provide additional
                info and add a profile picture to further the community of trust.
              </p>
            </div>
          </div>
          <div className="row">
            <h3 id="safety" className="text-start text-hubbub my-3">Safety</h3>
            <div className="col-12 my-3">
              <h4 className="text-start">Is it reliable?</h4>
              <p className="text-start">
                The quality of all items on the platform are verified by the Hubbub
                Team. We only deal in good quality, clean, and usable items to make
                sure you're getting the best experience possible. We’re eliminating
                any risk to you of getting an item that doesn't match what you were
                expecting. Plus, we provide consistent, reliable delivery and pick-up,
                and will never keep you waiting.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">Is it safe?</h4>
              <p className="text-start">
                We're building a trusted community of people who share the values
                of making their life easier now, while preserving the planet's
                resources for our generation's future. We thus have high standards
                for everyone on the Hubbub Marketplace to be respectful, transparent,
                and fair. Every lister and renter has an account where any other
                user can see their reviews, listings, and basic information to promote
                accountability. No sketchy item listings, no scamming, and no discrimination.
                The fact that we handle all interactions between listers and users means
                you’ll always have a consistent, enjoyable and safe experience on the
                platform. We also follow strict guidelines to maintain COVID-19 safety
                throughout our system and operations.
              </p>
            </div>
          </div>
          <div className="row">
            <h3 id="random" className="text-start text-hubbub my-3">Miscellaneous</h3>
            <div className="col-12 my-3">
              <h4 className="text-start">What's different about Hubbub?</h4>
              <p className="text-start">
                Rentals and used goods services typically come with issues of trust,
                reliability, and cleanliness. We're changing things by providing an
                enjoyable and frictionless way to avoid buying new when you don't
                want to. Our wide selection of items and competitive delivery, all
                at a tiny fraction of retail prices, will finally leave you with a
                better alternative to buying new.
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">How do we make money?</h4>
              <p className="text-start">
                We earn revenue from listing some Hubbub-owned items on the marketplace.
                We also collect commissions from some of the private listers on the platform
                while they maintain full control over the settings of their item.
                The money that Hubbub gets will simply go back into making the
                service better for all you!
              </p>
            </div>
            <div className="col-12 my-3">
              <h4 className="text-start">What if I have more questions?</h4>
              <p className="text-start">
                Reach out to any of us whatever way is easiest for you! You can see the links
                below for quick ways to contact us! We’re always responsive and love helping out :)
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}

export default Faqs;
