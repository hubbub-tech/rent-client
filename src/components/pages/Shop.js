import React from 'react';
import ShopCard from './parts/ShopCard';

const ShopHeader = () => {
  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-11 mt-5">
        <h1>Rent</h1>
        <p>Can’t find what you’re looking for?</p>
        <p>
          Let us know
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" target="_blank">here</a>
          , and we’ll try to help you out!
        </p>
      </div>
    </div>
  );
}

const ShopCategories = () => {
  return (
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
              minlength="1"
              maxlength="29"
              aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
          </div>
        </form>
      </ul>
    </div>
  );
}

const Shop = (urlPrefix, items, listers) => {
  return (
    <main>
      <div className="container-md">
        <ShopHeader />
        <ShopCategories />
        <hr />
        <div class="row">
          {items.map((item, index) => (
            <ShopCard imgHost={urlPrefix} item={item} lister={listers[item.lister_id]} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Shop;
