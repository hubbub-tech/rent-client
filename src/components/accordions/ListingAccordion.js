import React from 'react';

const VisibilityOptions = ({item}) => {
  if (item.is_available) {
    return (
      <a style={{"color": "red"}} href={`/accounts/i/hide/id=${item.id}&status=${0}`}>
        <div className="accordion-body my-1"><p className="card-text">Hide Item</p></div>
      </a>
    );
  } else if (true) { // TODO: check if the item has expired
    return (
      <a style={{"color": "green"}} href={`/accounts/i/hide/id=${item.id}&status=${1}`}>
        <div className="accordion-body my-1"><p className="card-text">Make Available</p></div>
      </a>
    );
  } else {
    return (
      <a style={{"color": "red"}} href={`/accounts/i/edit/id=${item.id}`}>
        <div className="accordion-body my-1"><p className="card-text">Expired. Extend the rental ending here.</p></div>
      </a>
    );
  }
}

const ListingAccordion = ({isOwner, item, calendar}) => {
  return (
    <div className="accordion mb-3" id={`item-accordion-${item.id}`}>
      <div className="accordion-item">
        <p className="accordion-header" id={`header-${item.id}`}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${item.id}`}
            aria-expanded="true"
            aria-controls={`collapse-${item.id}`} >{{ item.name }}
            {!listing.is_available &&
              <span className="text-danger text-end mx-2">(Inactive)</span>
            }
          </button>
        </p>
        <div
          id={`collapse-${item.id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`header-${item.id}`}
          data-bs-parent={`#item-accordion-${item.id}`}>
          <div className="accordion-body">
            <p className="card-text">Priced @ {item.price} per day</p>
            <small className="card-text my-1">Currently available from {calendar.date_started} to {calendar.date_ended}.</small>
          </div>
          <hr className="divider"/>
          <a href={`/inventory/i/id=${ item.id }`}>
            <div className="accordion-body my-1"><p className="card-text">View Item</p></div>
          </a>
          <hr className="divider"/>
          {isOwner
            ? <a href="/account/u/edit.item.{{ item.id }}">
                <div className="accordion-body my-1"><p className="card-text">Edit Item</p></div>
              </a>
            : null
          }
          <hr class="divider"/>
          {isOwner
            ? <VisibilityOptions item={item} />
            : <div className="accordion-body my-1">
                <p className="card-text" style={{"color": "red"}}>This listing has expired.</p>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ListingAccordion;
