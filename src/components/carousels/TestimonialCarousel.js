import React from 'react';

const TestimonialCarousel = ({testimonials}) => {
  if (testimonials) {
    return (
      <div className="carousel slide" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
        <h2 className="text-center">Your Friends &#128147; Hubbub</h2>
        <div className="carousel-inner mt-3">
          {testimonials.map((testimonial, index) => (
            <div className={`${index === 0 ? 'active' : ''} carousel-item`} key={`carousel-testimonial-${index}`}>
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
