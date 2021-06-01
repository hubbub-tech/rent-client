import React from 'react';
import MainBanner from '../banners/MainBanner';
import CategoryCard from '../cards/CategoryCard';
import NewsletterForm from '../forms/NewsletterForm';
import TestimonialCarousel from '../carousels/TestimonialCarousel';

const Main = ({testimonials}) => {
  return (
    <main>
      <MainBanner />
      <div className="container-md">
        <div className="row mt-5">
          <h1 className="text-center">Top Categories</h1>
          <p className="text-center">Rent from the most active categories on Hubbub!</p>
          <CategoryCard category={{"link": "/kitchen", "title": "Kitchen", "alt": "Pots"}} />
          <CategoryCard category={{"link": "/everything", "title": "Everything", "alt": "Fridge"}} />
          <CategoryCard category={{"link": "/entertainment", "title": "Entertainment", "alt": "Kindle Fire"}} />
          <CategoryCard category={{"link": "/misc", "title": "Random", "alt": "Lights"}} />
          <CategoryCard category={{"link": "/school", "title": "School", "alt": "Calculator"}} />
          <CategoryCard category={{"link": "/living", "title": "Living", "alt": "Weights"}} />
        </div>
        <hr/>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-md-2"></div>
          <div className="col-8">
            <TestimonialCarousel testimonials={testimonials} />
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
        <NewsletterForm />
      </div>
    </main>
  );
}

export default Main;
