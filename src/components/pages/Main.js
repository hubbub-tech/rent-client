import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TestimonialCard from '../cards/TestimonialCard';

const Main = () => {
  const [urlBase, setUrlBase] = useState();
  const [testimonials, setTestimonials] = useState([]);
  const categories = [
    {"link": "/search=kitchen", "title": "Kitchen", "alt": "Pots"},
    {"link": "/search=entertainment", "title": "Entertainment", "alt": "Kindle Fire"},
    {"link": "/search=living", "title": "Living", "alt": "Lights"},
    {"link": "/search=school", "title": "School", "alt": "Calculator"}
  ]

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/index')
    .then(res => res.json())
    .then(data => {
      setUrlBase(data.photo_url);
      setTestimonials(data.testimonials);
    });
  }, []);
  return (
    <main>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-5">
            <h1 className="text-center display-1 mt-5 text-hubbub">
              <big>HUBBUB</big>
            </h1>
            <h5 className="text-center mb-3">Discover the better, faster, cheaper way to get the items you need</h5>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="d-grid gap-2 my-5">
              <Link to="/inventory" className="btn btn-hubbub btn-lg" tabIndex="-1" role="button">Rent Now</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="row mt-5">
          <h1 className="text-center">Top Categories</h1>
          <p className="text-center">Rent from the most active categories on Hubbub!</p>
          <div className="col-sm-2"></div>
          {categories.map((category) => (
            <div className="col-sm-2 col-6 mb-1" key={category.title}>
              <h6 className="text-center my-3">{ category.title }</h6>
              <a className="custom-card" href={`/inventory${category.link}`}>
                <img
                  className="img-fluid rounded img-float"
                  src={`static/items/${category.title}.png`}
                  alt={category.alt}
                />
              </a>
            </div>
          ))}
          <div className="col-sm-2"></div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-md-2"></div>
          <div className="col-8">
            <h2 className="text-center mt-5">Your Friends &#128147; Hubbub!</h2>
            <p className="text-center mb-3">See what they have to say about their experience with us :)</p>
            <TestimonialCard testimonials={testimonials} urlBase={urlBase} />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="container-fluid mt-5 hubbub-background">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h2 className="text-center mt-5 mb-2 text-white">Let's Reinvent Ownership!</h2>
            <p className="text-center fs-5 mb-5 text-white">
              We are driven by a mission to get more use out of everyday items.
              We created Hubbub to make sharing items easier for everyone.
              Together we can reduce landfill waste and make ownership more flexible.
            </p>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </main>
  );
}

export default Main;
