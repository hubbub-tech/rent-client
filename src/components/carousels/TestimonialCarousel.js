import React from 'react';
import { useEffect } from 'react';

const TestimonialCarousel = ({testimonials}) => {
  useEffect(() => {
    let index = Math.floor(Math.random() * testimonials.length);
    for (var i = 0; i < testimonials.length; i++) {
      if (index === i) {
        testimonials[i]["classNames"] = "active carousel-item";
      } else {
        testimonials[i]["classNames"] = "carousel-item";
      }
    }
  });
  if (testimonials !== []) {
    return (
      <div className="carousel slide" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
        <h2 className="text-center">Your Friends &#128147; Hubbub</h2>
        <div className="carousel-inner mt-3">
          {testimonials.map((testimonial, index) => (
            <div className={`${testimonial.classNames === undefined ? 'carousel-item' : testimonial.classNames}`} key={`carousel-testimonial-${index}`}>
              <p className="text-center fs-3">{ testimonial.description }</p>
              <p className="text-center fs-5">{ testimonial.user.name } - { testimonial.user.city }, { testimonial.user.state }</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default TestimonialCarousel;
