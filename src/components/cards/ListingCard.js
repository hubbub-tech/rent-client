import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import ItemPhoto from '../icons/ItemPhoto';
import FeaturedBadge from '../icons/FeaturedBadge';
import { printDate } from '../../helper.js';

const ListingCard = ({
  item,
  urlBase,
  isOwner,
  setFlashMessages
}) => {
  const history = useHistory();

  const isStatusOK = (res) => {
    return res.json()
  }

  const handleItemPhotoOnClick = () => {
    history.push(`/inventory/i/id=${item.id}`)
  }

  const onClick = () => {
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/accounts/i/hide/id=${item.id}`, {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken, "toggle": !item.is_visible }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.messages));
  }
  return (
    <div className="card px-0 mb-3">
      <div className="card-body card-shadow">
        <div className="row">
          <div className="col-sm-3 my-2">
            {item.is_featured && <FeaturedBadge />}
            <ItemPhoto
              className="card-img img-fluid"
              src={`${urlBase}/${item.id}.jpg`}
              onClick={handleItemPhotoOnClick}
              item={item}
            />
          </div>
          <div className="col-sm-9">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-11 my-1">
                  <h3 className="card-title">
                    {item.name}
                    {!item.is_visible && <span className="text-alert"> (Inactive)</span>}
                  </h3>
                  <small className="card-subtitle text-success">Available starting {printDate(item.next_available_start)}</small>
                  <hr className="my-2" />
                  <p className="card-text">{item.description}</p>
                  <div className="row mt-3">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                      <a href={`/inventory/i/id=${item.id}`} type="button" className="btn btn-outline-dark">View Item</a>
                      {isOwner && <a href={`/accounts/i/edit/id=${item.id}`} type="button" className="btn btn-outline-dark">Edit Item</a>}
                      {isOwner &&
                        <button
                          onClick={onClick}
                          type="button"
                          className={`btn btn-outline-${item.is_visible ? 'danger' : 'success'}`}
                        >
                          {item.is_visible ? 'Hide Item' : 'Make Available'}
                        </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 my-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
