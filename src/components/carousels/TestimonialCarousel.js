import React from 'react';

const getInitialClassList = (index) => {
  let classList;
  if (index === 0) {
    classList = "carousel-item active";
  } else {
    classList = "carousel-item";
  }

  return classList;
}

const TestimonialCarousel = ({testimonials}) => {
  if (testimonials) {
    return (
      <div className="carousel slide" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
        <h2 className="text-center">Your Friends &#128147; Hubbub</h2>
        <div className="carousel-inner mt-3">
          {testimonials.map((testimonial, index) => (
            <div className={getInitialClassList(index)} key={`carousel-testimonial-${index}`}>
              <p className="text-center fs-3">{ testimonial.description }</p>
              <p className="text-center fs-5">{ testimonial.user_id }, { testimonial.date_created }</p>
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
