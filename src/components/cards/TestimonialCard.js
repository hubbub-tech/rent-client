import { useState, useEffect } from 'react';

import QuoteIcon from '../icons/QuoteIcon';
import ProfilePhoto from '../icons/ProfilePhoto';

const TestimonialCard = ({ testimonials, urlBase }) => {
  const [user, setUser] = useState({
    "id": 1,
    "name": "Alexander Hamilton",
    "profile": { "has_pic": true }
  });

  const [testimonial, setTestimonial] = useState({
    "description": "duh",
    "user": { "profile": {} }
  });

  useEffect(() => {
    setTestimonial(testimonials);
    console.log(testimonial);
  },[]);
  return (
    <div class="card shadow-lg p-3 mb-5 bg-body rounded">
      <div class="card-body">
        <div className="row g-0">
          <div className="col-sm-1 mb-0"></div>
          <div className="col-sm-10 mb-0">
            <QuoteIcon />
          </div>
          <div className="col-sm-1 mb-0"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <p className="text-center fw-bolder fs-5">{ "Hey, i was doing just fine until i met you, i drink too much and thats an issue but im ok." }</p>
            <p className="text-center mb-1">{ user.name }</p>
            <p className="text-center text-muted card-subtitle mb-2">New York, NY</p>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <ProfilePhoto src={`${urlBase}/${user.id}.jpg`} user={user} size="50px" />
      </div>
    </div>
  );
}

export default TestimonialCard;
