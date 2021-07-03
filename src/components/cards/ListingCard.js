import React from 'react';

import { printDate } from '../../helper.js';

const ListingCard = ({ item, urlBase, isOwner, setFlashMessages }) => {

  const isStatusOK = (res) => {
    // some action that is dependent on the status of the POST
    return res.json()
  }

  const onClick = () => {
    fetch(`/accounts/i/hide/id=${item.id}`, {
      method: 'POST',
      body: JSON.stringify({ "toggle": !item.is_available }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
  }
  return (
    <div className="card px-0 mb-3">
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
                <div className="col-md-9 my-1">
                  <h3 className="card-title">
                    {item.name}
                    {!item.is_available && <span className="text-alert"> (Inactive)</span>}
                  </h3>
                  <small className="card-subtitle text-success">Available starting {printDate(item.next_available_start)}</small>
                  <hr className="my-2" />
                  <p className="card-text">{item.details.description}</p>
                  <div className="row mt-3">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                      <a href={`/inventory/i/id=${item.id}`} type="button" className="btn btn-outline-dark">View Item</a>
                      {isOwner && <a href={`/accounts/i/edit/id=${item.id}`} type="button" className="btn btn-outline-dark">Edit Item</a>}
                      {isOwner &&
                        <button
                          onClick={onClick}
                          type="button"
                          className={`btn btn-outline-${item.is_available ? 'danger' : 'success'}`}
                        >
                          {item.is_available ? 'Hide Item' : 'Make Available'}
                        </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-md-3 my-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
