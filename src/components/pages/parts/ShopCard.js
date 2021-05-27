import React from 'react';

const ShopCard = (imgHost, item, lister) => {
  const itemDetailsLink = "/inventory/item." + item.id.toString()
  const listerAccountLink = "/account/u." + item.lister_id.toString()
  const imgLink = imgHost + "/" + item.id.toString() + ".jpg"
  const cardId = "item-" + item.id.toString()
  return (
    <div className="col-lg-3 col-md-6" key={item.id}>
      <a className="custom-card" href={itemDetailsLink}>
        <div className="card shadow mt-1 mb-3 zoom-in" id={cardId}>
          <img className="card-img-top img-fluid" src={imgLink} alt={item.name} />
          <div className="card-body">
            <h6 className="card-title">{item.name}</h6>
            <p className="card-text mt-3 mb-1">From</p>
            <p className="card-text mb-1">{item.price}/day, SOMETHING/week</p>
            <p className="card-text">SOMETHING/mo, SOMETHING/3-mos</p>
            <p className="card-text">Listed by <a href={listerAccountLink}>{lister.name}</a></p>
            <hr className="my-2" />
            <small className="card-text text-success">Available starting SOMETIME</small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ShopCard;
