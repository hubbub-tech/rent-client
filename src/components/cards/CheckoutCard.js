import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';
import RentalUpdateForm from '../forms/RentalUpdateForm';

const CheckoutCard = ({
  urlBase,
  item,
  toggle,
  setToggle,
  setFlashMessages
}) => {
  const history = useHistory();
  const [reservation, setReservation] = useState(item.reservation);

  const editItem = (e) => {
    setReservation(null);
  }

  const viewItem = (e) => {
    e.preventDefault()
    history.push(`/inventory/i/id=${item.id}`);
  }

  const removeItem = (e) => {
    e.preventDefault()
    let startDate;
    let endDate;
    if (item.reservation) {
      let startDate = item.reservation.date_started;
      let endDate = item.reservation.date_ended;
    }
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/remove/i/id=${item.id}`, {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken, startDate, endDate }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      setFlashMessages(data.flashes)
      setToggle(!toggle);
    });
    let oldCartSize = Cookies.get('cartSize')
    Cookies.set('cartSize', parseInt(oldCartSize) - 1);
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-5">
            <img className="card-img-top" src={`${urlBase}/${item.id}.jpg`} alt={item.name} />
          </div>
          <div className="col-md-7">
            <h4 className="card-title">{ item.name }</h4>
            <small className="card-text text-success">Available starting { printDate(item.calendar.next_available_start) }</small>
            <hr />
            {!reservation &&
              <RentalUpdateForm
                toggle={toggle}
                setToggle={setToggle}
                calendar={item.calendar}
                setFlashMessages={setFlashMessages}
              />
            }
            {reservation && <p className="card-text">Rental Starting - {printDate(reservation.date_started)}</p>}
            {reservation && <p className="card-text">Rental Ending - {printDate(reservation.date_ended)}</p>}
            {reservation && <p className="card-text">Price - {printMoney(reservation.charge)}</p>}
          </div>
          <div className="btn-group mt-3" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-outline-dark" onClick={viewItem}>View</button>
            {reservation && <button type="button" className="btn btn-outline-dark" onClick={editItem}>Edit Rental</button>}
            {!reservation && <button type="button" className="btn btn-dark" onClick={() => setReservation(item.reservation)}>Hide Form</button>}
            <button type="button" className="btn btn-outline-danger" onClick={removeItem}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
