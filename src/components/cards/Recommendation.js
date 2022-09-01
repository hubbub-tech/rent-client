import React from 'react';

import { printMoney } from '../../helper.js';
const Recommendation = ({ urlBase, item }) => {
  return (
    <a className="custom-card" href={`/inventory/i/id=${item.id}`}>
      <div className="card mt-1 mb-3" id={`item-${item.id}`}>
        <div className="card-body">
          <img
            className="card-img img-fluid"
            src={`${urlBase}/${item.id}.jpg`}
            alt={item.name}
          />
          <h6 className="card-title">{item.name}</h6>
          <p className="card-text mt-3 mb-1">From {printMoney(item.retail_price)}/day</p>
        </div>
      </div>
    </a>
  );
}

export default Recommendation;
