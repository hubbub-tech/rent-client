import React from 'react';
import CategoryCard from './parts/CategoryCard';

const TestimonialSlides = ({testimonials}) => {
  const myTestimonials = [
    {
      "date_created": "2021-01-15",
      "description": "The fact that you can get what you need but you don\u2019t have to keep it is really attractive!",
      "user_id": 1
    },
    {
      "date_created": "2021-01-16",
      "description": "What else can I list? This is so fun!",
      "user_id": 2
    }
  ];
  const testimonialIndex = ({index}) => {
    return "carousel-testimonial-" + index.toString();
  }

  const activateCarousel = ({target}) => {
    let carousel = document.getElementById(target);
    let activation = "active";
    let classList = carousel.className.split(" ");

    if (classList.indexOf(activation) === -1) {
      carousel.className += " " + activation;
    }
  }
  return (
    <div className="carousel slide" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
      <h2 className="text-center">Your Friends &#128147; Hubbub</h2>
      <div className="carousel-inner mt-3">
        {myTestimonials.map((testimonial, index) => (
          <div className="carousel-item" key={testimonialIndex(index)}>
            <p className="text-center fs-3">{ testimonial.description }</p>
            <p className="text-center fs-5">{ testimonial.user_id }, { testimonial.date_created }</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const MainBanner = () => {
  return (
    <div className="container-fluid index-background">
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-8 mt-5">
          <br/>
          <h1 className="text-center display-1 mt-5 text-white">
            <big>HUBBUB</big>
          </h1>
          <h5 className="text-center mb-3">Conveniently rent the items you need! We deliver right to your door!</h5>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="d-grid gap-2 mb-5">
            <a href="/inventory" className="btn btn-primary btn-lg" tabIndex="-1" role="button">Rent Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const MainContent = ({testimonials}) => {
  return (
    <div className="container-md">
      <div className="row mt-5">
        <h1 className="text-center">Top Categories</h1>
        <p className="text-center">Rent from the most active categories on Hubbub!</p>
        <CategoryCard category={{"link": "/kitchen", "title": "Kitchen", "alt": "Pots"}} />
      </div>
      <hr/>
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-8">
          <TestimonialSlides testimonials={testimonials} />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-5 mt-3">
          <h2 className="text-start mt-5 mb-2">Let's Reinvent Ownership</h2>
          <p className="text-start">
            We are driven by a mission to get more use out of everyday items.
            We created Hubbub to make sharing items easier for everyone.
            Together we can reduce landfill waste and make ownership more flexible.
          </p>
        </div>
        <div className="col-md-6">
        {
          // find out how to put video here
        }
        </div>
      </div>
      <div className="row mt-5">
        <h3 className="text-center">What's all the Hubbub?</h3>
        <div className="container" style={{"maxWidth": "720px"}}>
          <p className="text-center">
            Learn more about our community of people who care about sustainability and affordability.
            Subscribe with your email to follow our newsletter.
          </p>
          <div className="row justify-content-md-center">
            <div className="col-md-6 col mx-auto">
              <form method="POST" action="/join-email/from=main.index">
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    aria-label="you@example.com"
                    aria-describedby="button-addon2" required />
                  <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Join</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Main = ({testimonials}) => {
  return (
    <main>
      <MainBanner />
      <MainContent testimonials={testimonials} />
    </main>
  );
}

export default Main;
