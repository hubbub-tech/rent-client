import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

const ShopCard = ({urlBase, item}) => {
return (
  <a className="custom-card zoom-in" href={`/inventory/i/id=${item.id}`}>
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-body card-shadow">
        <div className="row">
          <div className="col-sm-3 my-2">
            {item.is_featured && <span className="badge badge-primary badge-pill mb-3">Featured</span>}
            <img
              className="card-img img-fluid"
              src={`${urlBase}/${item.id}.jpg`}
              alt={item.name}
            />
          </div>
          <div className="col-sm-9">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 my-1">
                  <h2 className="card-title">{item.name}</h2>
                  <h6 className="card-subtitle mb-2 text-muted">Listed on {item.dt_created} by {item.lister.name}</h6>
                  <p className="card-text mt-3 mb-1">One day estimate: {item.price}</p>
                  <p className="card-text mt-3 mb-1">One week estimate: {item.price}</p>
                  <p className="card-text mt-3 mb-1">One month estimate: {item.price}</p>
                  <p className="card-text mt-3 mb-1">Three month estimate: {item.price}</p>
                  <hr className="my-2" />
                  <small className="card-text text-success">Available starting {item.next_available_start}</small>
                  <div className="d-grid gap-2 col-4 mt-3">
                    <button className="btn btn-hubbub">See Details</button>
                  </div>
              </div>
                <div className="col-md-4 my-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
  );
}

const AltShopCard = ({imgPath, item}) => {
  return (
    <div className="col-lg-3 col-md-6">
      <a className="custom-card" href={`/inventory/i/id=${item.id}`}>
        <div className="card shadow mt-1 mb-3 zoom-in" id={`item-${item.id}`}>
          <img className="card-img-top img-fluid" src={`${imgPath}/${item.id}.jpg`} alt={item.name} />
          <div className="card-body">
            <h6 className="card-title">{item.name}</h6>
            <p className="card-text mt-3 mb-1">From</p>
            <p className="card-text mb-1">{item.price}/day</p>
            <p className="card-text">Listed by {item.lister.name}</p>
            <hr className="my-2" />
            <small className="card-text text-success">Available starting {item.next_available_start}</small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ShopCard;
