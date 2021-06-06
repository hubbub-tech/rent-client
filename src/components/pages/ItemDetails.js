import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import RentalForm from '../forms/RentalForm';

const ItemDetails = ({isLoggedIn, setFlashMessages}) => {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [urlBase, setUrlBase] = useState(null);
  const [details, setDetails] = useState({});
  const [calendar, setCalendar] = useState({});
  const [reservation, setReservation] = useState(null);
  useEffect(() => {
    fetch(`/inventory/i/id=${itemId}`)
    .then(res => res.json())
    .then(data => {
      setItem(data.item);
      setUrlBase(data.photo_url);
      setDetails(data.details);
      setCalendar(data.calendar);
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
    .then(res => {
      res.json().then(data => setFlashMessages(data.flashes));
    });
  }
  return (
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
          <p className="card-text text-center">Available starting { calendar.next_available_start }</p>
          <div className="card">
            <div className="card-body">
              {reservation && <p className="text-start fs-5 fw-bold">Rent for <mark>{reservation.charge}</mark></p>}
              {!reservation && <p className="text-start fs-5 fw-bold">How long do you want to rent?</p>}
              {isLoggedIn &&
                <RentalForm
                  calendar={calendar}
                  setFlashMessages={setFlashMessages}
                  setReservation={setReservation} />
              }
              <div className="d-grid gap-2 my-3">
                <button className="btn btn-success" onClick={addToCart}>Add to Cart</button>
              </div>
              {!isLoggedIn &&
                <div className="mt-1">
                  <p className="text-start fs-5 fw-bold">Don't have an account yet?</p>
                  <p>Sign up <a href="/register">here</a> to order this item!</p>
                </div>
              }
              <hr />
              <p className="text-start fs-5 fw-bold">Specs</p>
              <p className="text-start">{ details.description }</p>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row mt-3">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <p className="text-start fs-5 fw-bold">More Info</p>
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <p><strong>Location</strong> - SOMEWHERE</p>
                </div>
                <div className="col-lg-3 col-md-6">
                  <p><strong>Condition</strong> - { details.condition }</p>
                </div>
                <div className="col-lg-3 col-md-6"><p>
                  <strong>Weight</strong> - { details.weight }</p>
                </div>
                <div className="col-lg-3 col-md-6"><p>
                  <strong>Volume</strong> - { details.volume }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default ItemDetails;
