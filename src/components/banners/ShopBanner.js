import React from 'react';

const ShopBanner = () => {
  const waitlistLink = "https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform"
  return (
    <div className="container-md">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-11 mt-5">
          <h1>Rent</h1>
          <p>Can’t find what you’re looking for?</p>
          <p>Let us know <a href={waitlistLink} target="_blank" rel="noreferrer">here</a>, and we’ll try to help you out!</p>
        </div>
      </div>
      <div className="row">
        <ul className="nav justify-content-center">
          <div className="nav" id="dropdownify">
            <li className="nav-item"><a className="nav-link" href="/inventory">All</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/kitchen">Kitchen</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/living">Living</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/outdoors">Outdoors</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/school">School</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/games">Games</a></li>
            <li className="nav-item"><a className="nav-link" href="/inventory/miscellaneous">Random</a></li>
          </div>
          <form className="d-flex" method="POST" action="/inventory">
            <div className="input-group mx-5">
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Search items..."
                aria-label="Search items..."
                minLength="1"
                maxLength="29"
                aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
}

export default ShopBanner;
