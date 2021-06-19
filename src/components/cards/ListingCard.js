import React from 'react';

const ListingCard = ({ item, isOwner }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-8 my-2">
            <h5 className="text-start">{item.name}</h5>
          </div>
          {!item.is_available &&
            <div className="col-md-4 my-2">
              <p className="text-end text-alert">(Inactive)</p>
            </div>
          }
        </div>
      </div>
      <div className="card-body">
        <a href={`/inventory/i/id=${item.id}`} className="card-link">View Item</a>
        {isOwner && <a href={`/accounts/i/edit/id=${item.id}`} className="card-link">Edit Item</a>}
      </div>
    </div>
  );
}

export default ListingCard;
