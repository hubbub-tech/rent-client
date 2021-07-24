import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useAnalytics } from '../base/GoogleTags';
import FeedbackForm from '../forms/FeedbackForm';

const Error404 = ({ setFlashMessages }) => {
  const location = useLocation();
  useAnalytics(location.pathname);

  useEffect(() => {
    AOS.init({duration : 1000, once: true});
  }, []);
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-hubbub display-3 mt-5">404</h1>
            <h3 className="text-center text-muted fst-italic mb-5">This is not the page you're looking for...</h3>
            <p className="text-center">Return to <a href="/">Home Page</a>.</p>
            <p className="text-center">Go to <a href="/inventory">Rent Page</a>.</p>
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-6" data-aos="fade-up">
            <img
              className="rounded img-fluid my-5"
              src="../static/backgrounds/obiwan404.jpeg"
              alt="Jedi Knight"
            />
            <FeedbackForm setFlashMessages={setFlashMessages} href={location.pathname} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default Error404;
