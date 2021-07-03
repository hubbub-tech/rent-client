import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';
import RentalForm from '../forms/RentalForm';
import ShopCard from '../cards/ShopCard';

import AOS from 'aos';
import 'aos/dist/aos.css';

const ItemDetails = ({isLoggedIn, setFlashMessages}) => {
  const { itemId } = useParams();
  const [item, setItem] = useState({
    "address": {},
    "details": {},
    "calendar": {}
  });
  const [recommendations, setRecommendations] = useState([]);
  const [urlBase, setUrlBase] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    AOS.init({duration : 1000});
    fetch(`/inventory/i/id=${itemId}`)
    .then(res => res.json())
    .then(data => {
      setItem(data.item);
      setUrlBase(data.photo_url);
      setRecommendations(data.recommendations);
    });
  }, [itemId]);

  const addToCart = () => {
    let startDate = null;
    let endDate = null;
    if (reservation !== null) {
      startDate = reservation.date_started;
      endDate = reservation.date_ended;
    }
    fetch(`/add/i/id=${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      setFlashMessages(data.flashes);
    });
    window.scrollTo(0, 0);
  }
  return (
    <main>
      <div className="container-md">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-11 mt-5">
            <h2 className="text-start">{ item.name }</h2>
            <p className="text-start fs-4">from
              <Link to={`/account/u/${item.lister_id}`}> {item.lister_name}</Link>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6 mt-5">
            <img
              className="card-img-top rounded"
              src={`${urlBase}/${itemId}.jpg`}
              alt={item.name} />
          </div>
          <div className="col-md-4 mt-2">
            <p className="card-text text-center">
              <span className="badge rounded-pill bg-primary">Available starting { printDate(item.calendar.next_available_start) }</span>
            </p>
            <div className="card">
              <div className="card-body">
                {reservation && <p className="text-start fs-5 fw-bold">Rent for <span className={`${reservation && 'highlight-alert'}`}>{printMoney(reservation.charge)}</span></p>}
                {!reservation && <p className="text-start fs-5 fw-bold">How long do you want to rent?</p>}
                {isLoggedIn &&
                  <RentalForm
                    calendar={item.calendar}
                    setFlashMessages={setFlashMessages}
                    setReservation={setReservation}
                  />
                }
                {isLoggedIn &&
                  <div className="d-grid gap-2 my-3">
                    <button className="btn btn-success" onClick={addToCart}>Add to Cart</button>
                  </div>
                }
                {!isLoggedIn &&
                  <div className="mt-1">
                    <p className="text-start fs-5 fw-bold">Join Hubbub to get everything you need for low cost!</p>
                    <p>Sign up <a href="/register">here</a> to order this item!</p>
                  </div>
                }
                <hr />
                <p className="text-start fs-5 fw-bold">Specs</p>
                <p className="text-start">{ item.details.description }</p>

              <p className="text-start fs-5 fw-bold">More Info</p>
                <p><strong>Location</strong> - {item.address.city}, {item.address.state}</p>
                <p><strong>Condition</strong> - { item.details.condition }</p>
                <p><strong>Weight</strong> - { item.details.weight }</p>
                <p><strong>Volume</strong> - { item.details.volume }</p>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mt-3">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <hr />
            <h3 className="text-start mt-5">Looking for something else?</h3>
            <p className="text-start mb-5">Check out some of our other featured items or you can <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub btn-sm" target="_blank" rel="noreferrer">Request an Item</a> and we’ll try to help you out!</p>
            <div className="row">
              {recommendations.length > 0 && recommendations.map((item) => (
                <div className="col-12" key={item.id}>
                  <ShopCard urlBase={urlBase} item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mt-3">
          <p className="text-center">
            Having trouble finding something? You can <span className="fw-bold text-hubbub">request an item</span> through our form :)!
            Just click below and we'll try to help you out!
          </p>
          <div className="d-grid gap-2 col-6  mx-auto my-3">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub btn-lg" target="_blank" rel="noreferrer">Request an Item</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemDetails;
