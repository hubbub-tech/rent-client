import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TestimonialCard from '../cards/TestimonialCard';
import NewsletterForm from '../forms/NewsletterForm';

const Main = ({ setFlashMessages }) => {
  const [user, setUser] = useState({
    "profile": {},
    "cart": {}
  });

  const [urlBase, setUrlBase] = useState();
  const [testimonial, setTestimonial] = useState([]);
  const categories = [
    {"link": "/search=kitchen", "title": "Kitchen", "alt": "Pots"},
    {"link": "/search=entertainment", "title": "Entertainment", "alt": "TV"},
    {"link": "/search=lamp", "title": "Lighting", "alt": "Lights"},
    {"link": "/search=school", "title": "School", "alt": "Calculator"},
    {"link": "/search=fitness", "title": "Fitness", "alt": "Weights"},
    {"link": "/search=fridge", "title": "Fridges", "alt": "Fridge"},
    {"link": "/search=fan", "title": "Fans", "alt": "Honeywell Fan"},
    {"link": "/search=living", "title": "Living", "alt": "JBL Speakers"}
  ]

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/index')
    .then(res => res.json())
    .then(data => {
      // setUser(data.user);
      // setUrlBase(data.photo_url);
      // setTestimonial(data.testimonial);
    });
  }, []);
  return (
    <main>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 mt-5">
            <h1 className="text-center display-6 mt-5 mb-3 text-hubbub">
              Discover the better, faster, cheaper way to get the items you need.
            </h1>
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="d-grid gap-2 my-5">
              <Link
                to="/inventory"
                className="btn btn-hubbub btn-lg"
                tabIndex="-1"
                role="button"
              >
                Rent Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="row mt-5">
          <h1 className="text-center">Top Categories</h1>
          <p className="text-center">Rent from the most active categories on Hubbub!</p>
          {categories.map((category) => (
            <div className="col-sm-3 col-6 mb-1" key={category.title}>
              <h4 className="text-center my-3">{ category.title }</h4>
              <a className="custom-card" href={`/inventory${category.link}`}>
                <img
                  className="img-fluid rounded img-float"
                  src={`static/items/${category.title}.png`}
                  alt={category.alt}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid mt-5 hubbub-background">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-2 my-5"></div>
          <div className="col-sm-8 my-5">
            <h2 className="text-center text-white">Your Friends &#128147; Hubbub!</h2>
            <p className="text-center mb-3 text-white">See what they have to say about their experience with us :)</p>
            // <TestimonialCard user={user} testimonial={testimonial} urlBase={urlBase} />
          </div>
          <div className="col-sm-2 my-5"></div>
        </div>
      </div>
      <div className="container-md mb-5">
        <div className="row mt-5">
          <div className="col-sm-1"></div>
          <div className="col-sm-5">
            <h2 className="text-start mt-5 mb-3">
              We believe that what’s best for <span className="text-hubbub">you</span> can
               also be what’s best for the <span className="text-hubbub">climate</span> 🌎.
            </h2>
            <p className="text-start fs-5 mb-5">
              Our goal is to make it incredibly easy and enjoyable for you to get
              the products you need without always having to buy everything yourself.
              In doing so, we’re also able to extend the useful lifespan of items
              already in existence, keep quality items out of landfill, and reduce
              the need to produce and ship new stuff around the world.
            </p>
          </div>
          <div className="col-sm-5">
            <NewsletterForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default Main;
