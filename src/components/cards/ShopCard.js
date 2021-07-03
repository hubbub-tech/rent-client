import React from 'react';

import { printDate, printMoney } from '../../helper.js';

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
                  <h6 className="card-subtitle mb-2 text-muted">Listed on {printDate(item.dt_created)} by {item.lister.name}</h6>
                  <p className="card-text mt-3 mb-1">One day estimate: {printMoney(item.price)}</p>
                  <p className="card-text mt-3 mb-1">One week estimate: {printMoney(item.price)}</p>
                  <p className="card-text mt-3 mb-1">One month estimate: {printMoney(item.price)}</p>
                  <p className="card-text mt-3 mb-1">Three month estimate: {printMoney(item.price)}</p>
                  <hr className="my-2" />
                  <small className="card-text text-success">Available starting {printDate(item.next_available_start)}</small>
                  <div className="d-grid gap-2 col-sm-4 mt-3">
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

export default ShopCard;
