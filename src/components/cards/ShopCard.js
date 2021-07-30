import React from 'react';

import { printDate, printMoney } from '../../helper.js';
import QuoteInput from '../inputs/QuoteInput';

const ShopCard = ({ urlBase, item }) => {
return (
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-body card-shadow">
        <div className="row">
          <div className="col-sm-2 my-2">
            {item.is_featured && <span className="badge badge-primary badge-pill mb-3">Featured</span>}
            <a className="custom-card zoom-in" href={`/inventory/i/id=${item.id}`}>
              <img
                className="card-img img-fluid"
                src={`${urlBase}/${item.id}.jpg`}
                alt={item.name}
              />
            </a>
          </div>
          <div className="col-sm-10">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-10 my-1">
                  <h4 className="card-title">{item.name}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">Listed on {printDate(item.dt_created)}</h6>
                  <p className="card-text mt-3 mb-1">{printMoney(item.price_per_day)} estimate for 1 day</p>
                  <QuoteInput price={item.price} />
                  <hr className="my-2" />
                  <small className="card-text text-success">Available starting {printDate(item.next_available_start)}</small>
                  <div className="d-grid gap-2 col-sm-6 mt-3">
                    <a href={`/inventory/i/id=${item.id}`} className="btn btn-hubbub">See Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
