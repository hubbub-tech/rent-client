import React from 'react';

const OrderCard = ({ urlBase, order }) => {
  return (
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-4">
            Order Placed - {order.date_placed}
          </div>
          <div class="col-md-4">
            Charge - ${order.reservation.charge}
          </div>
          <div class="col-md-4">
            Deposit - ${order.reservation.deposit} {order.is_extended ? '(extended)' : ''}
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-0">
          <div class="col-md-4">
            <img class="img-thumbnail" src={`${urlBase}/${order.item_id}.jpg`} alt={order.item.name} />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Start - {order.res_date_start} to End - {order.ext_date_end}</h5>
              <p class="card-text">{order.item.name}</p>
              <p class="card-text">{order.item.details.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
