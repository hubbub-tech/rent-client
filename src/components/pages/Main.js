import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TestimonialCarousel from '../carousels/TestimonialCarousel';

const Main = () => {

  const [testimonials, setTestimonials] = useState([]);
  const categories = [
    {"link": "/search=kitchen", "title": "Kitchen", "alt": "Pots"},
    {"link": "", "title": "Everything", "alt": "Fridge"},
    {"link": "/search=entertainment", "title": "Entertainment", "alt": "Kindle Fire"},
    {"link": "/search=random", "title": "Random", "alt": "Lights"},
    {"link": "/search=school", "title": "School", "alt": "Calculator"},
    {"link": "/search=living", "title": "Living", "alt": "Weights"}
  ]

  useEffect(() => {
    fetch('/index')
    .then(res => res.json())
    .then(data => setTestimonials(data.testimonials));
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
            <h5 className="text-center mb-3">Conveniently rent the items you need, and have them delivered to your door</h5>
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
          {categories.map((category) => (
            <div className="col-md-2 col-6 mb-1" key={category.title}>
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
        </div>
        <hr/>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-md-2"></div>
          <div className="col-8">
            <TestimonialCarousel testimonials={testimonials} />
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
