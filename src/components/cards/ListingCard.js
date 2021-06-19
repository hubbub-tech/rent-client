import React from 'react';

const ListingCard = ({ item, isOwner, setFlashMessages }) => {

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
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-8 mt-2">
            <h5 className="text-start">{item.name}</h5>
          </div>
          {!item.is_available &&
            <div className="col-md-4 mt-2">
              <p className="text-end text-alert">(Inactive)</p>
            </div>
          }
        </div>
      </div>
      <div className="card-body">
        <a href={`/inventory/i/id=${item.id}`} className="card-link">View Item</a>
        {isOwner && <a href={`/accounts/i/edit/id=${item.id}`} className="card-link">Edit Item</a>}
        {isOwner &&
          <button onClick={onClick} className="btn btn-link">
            {item.is_available ? 'Hide Item' : 'Make Available'}
          </button>
        }
      </div>
    </div>
  );
}

export default ListingCard;
