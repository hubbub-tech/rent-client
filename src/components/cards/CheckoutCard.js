import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { printDate, printMoney } from '../../helper.js';
import RentalUpdateForm from '../forms/RentalUpdateForm';

const CheckoutCard = ({cookies, setCookie, urlBase, item, toggle, setToggle, setFlashMessages}) => {
  let history = useHistory();
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
    if (reservation) {
      let startDate = reservation.date_started;
      let endDate = reservation.date_ended;
      fetch(process.env.REACT_APP_SERVER + `/remove/i/id=${item.id}&start=${startDate}&end=${endDate}`, {
        method: 'POST',
        body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => {
        setFlashMessages(data.flashes)
        setToggle(!toggle);
      });
    } else {
      fetch(process.env.REACT_APP_SERVER + `/remove/i/id=${item.id}`, {
        method: 'POST',
        body: JSON.stringify({ "userId": cookies.userId, "auth": cookies.auth }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => {
        setFlashMessages(data.flashes)
        setToggle(!toggle);
      });
    }
    let newCartSize = parseInt(cookies.cartSize) - 1;
    setCookie("cartSize", newCartSize, { path: '/' });
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
                cookies={cookies}
                calendar={item.calendar}
                toggle={toggle}
                setToggle={setToggle}
                setFlashMessages={setFlashMessages} />
            }
            {reservation && <p className="card-text">Rental Starting - {printDate(reservation.date_started)}</p>}
            {reservation && <p className="card-text">Rental Ending - {printDate(reservation.date_ended)}</p>}
            {reservation && <p className="card-text">Price - {printMoney(reservation.charge)}</p>}
          </div>
          <div className="btn-group mt-3" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-outline-dark" onClick={viewItem}>View</button>
            {reservation && <button type="button" className="btn btn-outline-dark" onClick={editItem}>Edit Rental</button>}
            {!reservation && <button type="button" className="btn btn-outline-warning" onClick={() => setReservation(item.reservation)}>Hide Form</button>}
            <button type="button" className="btn btn-outline-danger" onClick={removeItem}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
