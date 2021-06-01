import React from 'react';

const EarlyReturnOptional = ({orderEndDate}) => {
  const todayDate = new Date();
  if (orderEndDate > todayDate) {
    return (
      <a href="/return/order.{{ orders[item.id].id }}">
        <div className="accordion-body my-1"><p className="card-text">Early Return</p></div>
      </a>
    );
  }
}

const RentalAccordion = ({order, item}) => {
  const orderStartDate = new Date(order.res_date_start);
  const orderEndDate = new Date(order.res_date_end);

  return (
    <div className="accordion mb-3" id={`item-accordion-${order.id}`}>
      <div className="accordion-item">
        <p className="accordion-header" id={`header-${order.item_id}-${order.id}`}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${order.item_id}-${order.id}`}
            aria-expanded="true"
            aria-controls={`collapse-${order.item_id}-${order.id}`}>{item.name}</button>
        </p>
        <div
          id={`collapse-${order.item_id}-${order.id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`header-${order.item_id}-${order.id}`}
          data-bs-parent={`#item-accordion-${order.id}`}>
          <div className="accordion-body">
            <p className="card-text py-1">Listed by <a href={`/accounts/u/id=${order.lister_id }`}>{ order.lister_id }</a></p>
            <small className="card-text my-1">Scheduled to rent from { order.res_date_start } to { order.res_date_end }.</small>
          </div>
          <hr className="divider"/>
          <a href={`/inventory/i/id=${order.item_id}`}>
            <div className="accordion-body my-1"><p className="card-text">View Item</p></div>
          </a>
          <hr className="divider"/>
          <a href={`/accounts/i/review/id=${order.item_id}`}>
            <div className="accordion-body my-1"><p className="card-text">Review Item</p></div>
          </a>
          <hr className="divider"/>
          <EarlyReturnOptional orderEndDate={orderEndDate} />
        </div>
      </div>
    </div>
  );
}

export default RentalAccordion;
