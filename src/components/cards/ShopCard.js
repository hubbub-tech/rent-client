import React from 'react';

const ShopCard = ({imgPath, item}) => {
return (
    <div className="col-lg-3 col-md-6">
      <a className="custom-card" href={`/inventory/i/id=${item.id}`}>
        <div className="card shadow mt-1 mb-3 zoom-in" id={`item-${item.id}`}>
          <img className="card-img-top img-fluid" src={`${imgPath}/${item.id}.jpg`} alt={item.name} />
          <div className="card-body">
            <h6 className="card-title">{item.name}</h6>
            <p className="card-text mt-3 mb-1">From</p>
            <p className="card-text mb-1">{item.price}/day</p>
            <p className="card-text">Listed by {item.lister.name}</p>
            <hr className="my-2" />
            <small className="card-text text-success">Available starting {item.next_available_start}</small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ShopCard;
