import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import RentalUpdateForm from '../forms/RentalUpdateForm';

const CheckoutCard = ({urlBase, item, toggle, setToggle, setFlashMessages}) => {
  let history = useHistory();
  const [reservation, setReservation] = useState(item.reservation);

  const editItem = (e) => {
    setReservation(null);
    //history.push('/checkout')
  }

  const viewItem = (e) => {
    console.log({item})
    e.preventDefault()
    history.push(`/inventory/i/id=${item.id}`);
  }

  const removeItem = (e) => {
    e.preventDefault()
    if (reservation) {
      let startDate = reservation.date_started;
      let endDate = reservation.date_ended;
      fetch(`/remove/i/id=${item.id}&start=${startDate}&end=${endDate}`)
      .then(res => res.json())
      .then(data => {
        setFlashMessages(data.flashes)
        setToggle(!toggle);
      });
    } else {
      fetch(`/remove/i/id=${item.id}`)
      .then(res => res.json())
      .then(data => {
        setFlashMessages(data.flashes)
        setToggle(!toggle);
      });
    }
  }
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-5">
          <img className="card-img-top" src={`${urlBase}/${item.id}.jpg`} alt={item.name} />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{ item.name }</h5>
            <small className="card-text text-success">Available starting { item.calendar.next_available_start }</small>
            <hr />
            {!reservation &&
              <RentalUpdateForm
                calendar={item.calendar}
                toggle={toggle}
                setToggle={setToggle}
                setFlashMessages={setFlashMessages} />
            }
            {reservation && <p className="card-text">Rental Starting - {reservation.date_started}</p>}
            {reservation && <p className="card-text">Rental Ending - {reservation.date_ended}</p>}
            {reservation && <p className="card-text">Price - {reservation.charge}</p>}

            <span><button className="btn btn-link" onClick={viewItem}>View</button>|</span>
            {reservation &&
            <span><button className="btn btn-link" onClick={editItem}>Edit Rental</button>|</span>
            }
            {!reservation &&
            <span><button className="btn btn-link" onClick={() => setReservation(item.reservation)}>Hide Form</button>|</span>
            }
            <span><button className="btn btn-link" onClick={removeItem}>Remove</button></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
