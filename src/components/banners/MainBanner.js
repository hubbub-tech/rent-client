import React from 'react';

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

export default MainBanner;
