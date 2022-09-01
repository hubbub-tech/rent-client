import React from 'react';
import { useHistory } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';
import FeaturedBadge from '../icons/FeaturedBadge';
import QuoteInput from '../inputs/QuoteInput';
import ItemPhoto from '../icons/ItemPhoto';

const MicroCard = ({ urlBase, item }) => {
  const history = useHistory();
  const onClick = () => history.push(`/inventory/i/id=${item.id}`);
  return (
    <div data-aos="fade-up" className="card px-0 mb-3">
      <div className="card-body card-shadow">
        <div className="row">
          <div className="col-sm-4 my-2">
            {item.is_featured && <FeaturedBadge />}
            <ItemPhoto
              className="card-img img-fluid"
              src={`${urlBase}/${item.id}.jpg`}
              onClick={onClick}
              item={item}
            />
          </div>
          <div className="col-sm-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12 my-1">
                  <h5 className="card-title">{item.name}</h5>
                  <small className="card-text text-success">Available starting {printDate(item.next_available_start)}</small>
                  <p className="card-text my-1">{printMoney(item.retail_price / 10)} estimate for 1 day</p>
                  <QuoteInput price={item.retail_price} />
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

export default MicroCard;
