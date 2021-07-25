import React from 'react'
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Story = () => {
  useEffect(() => {
    AOS.init({duration : 2000, once: true});
  }, []);
  return (
    <div className="container-md my-5">
      <div className="row justify-content-md-center my-5">
        <div className="col-12 mb-3">
          <h1 className="text-center display-2">Our Story</h1>
          <p className="text-center fs-5">...and we're still writing it</p>
        </div>
        <div className="col-2"></div>
        <div className="col-8" data-aos="fade-up">
          <img src="../static/backgrounds/story.jpg" className="img-fluid rounded" alt="Columbia at Night" />
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row my-3">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h2 className="text-start">How we started!</h2>
          <p className="text-start">
            We launched Hubbub back in January 2020 at Columbia with just a few well-placed
            flyers, some text messages, and an excel sheet. Since our humble beginnings,
            we've been set on providing students and young professionals with a low cost,
            convenient, and sustainable alternative to buying new.
          </p>
          <p className="text-start">
            On campuses and throughout cities, moving multiple times a year is often a
            necessity and comes with high costs and the hassles of storage and moving.
            In response, people tend to abandon their belongings and repurchase the same
            items again that they just got rid of. This cycle results in over 80,000 pounds
            of durable, useful items abandoned on Columbia’s campus alone and 225 million
            tons of these items sent to landfill each year across the country.
          </p>
          <p className="text-start">
            That’s about 400 tons of items every minute.
          </p>
          <p className="text-start">
            This mass of material releases methane gas, a powerful greenhouse that is 80
            times stronger than carbon dioxide, into the atmosphere--warming our planet.
          </p>
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="row my-3">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h2 className="text-start">Where we're going...</h2>
          <p className="text-start">
            But the story doesn't have to end that way.
          </p>
          <p className="text-start">
            We built Hubbub to eliminate all of the pain points that might hold someone
            back from renting or buying second hand. Hubbub provides a better alternative
            to getting your stuff from big, unsustainable online retailers. We're here to
            help you live sustainably without lowering your high standards for quick delivery,
            quality of the item, and low prices. We're building the new sharing economy,
            defined by sustainable, flexible ownership.
          </p>
          <p className="text-start">
            <i>This is a revolution in ownership, and we want you to join it.</i>
          </p>
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="row justify-content-md-center my-5">
        <div className="col-sm-3 col-12">
          <img src="../static/backgrounds/caro_perez_hubbub.jpeg" className="mx-auto d-block" style={{"borderRadius": "50%", "height": "160px"}} alt="Caro" />
          <br />
          <p className="text-center">Caro Perez SEAS '22</p>
          <p className="text-center">Co-Founder, Operations</p>
        </div>
        <div className="col-sm-3 col-12">
          <img src="../static/backgrounds/ade_balogun_hubbub.jpeg" className="mx-auto d-block" style={{"borderRadius": "50%", "height": "160px"}} alt="Ade" />
          <br />
          <p className="text-center">Ade Balogun SEAS '20</p>
          <p className="text-center">Co-Founder, Technology</p>
        </div>
        <div className="col-sm-3 col-12">
          <img src="../static/backgrounds/patty_varuzza_hubbub.jpeg" className="mx-auto d-block" style={{"borderRadius": "50%", "height": "160px"}} alt="Patty" />
          <br />
          <p className="text-center">Patrick Varuzza SEAS '20</p>
          <p className="text-center">Co-Founder, Business Development</p>
        </div>
      </div>
    </div>
  );
}

export default Story;
