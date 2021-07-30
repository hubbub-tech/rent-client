import React from 'react';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import OrderCard from '../cards/OrderCard';

const Rentals = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }

  const [isLoading, setIsLoading] = useState(true);
  const [urlBase, setUrlBase] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AOS.init({duration : 1000, once: true});
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + '/accounts/u/orders', {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setOrders(data.orders);
        setUrlBase(data.photo_url);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      }
    });
    setIsLoading(false);
  }, []);

  return (
    <main>
      <div className="container-md">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-11 mt-5">
            <h1 className="text-start">My Rentals</h1>
            <p className="text-start">See your rental history here, and manage current and past orders.</p>
          </div>
        </div>
        {orders.length !== 0 &&
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <hr />
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  urlBase={urlBase}
                  setFlashMessages={setFlashMessages}
                />
              ))}
            </div>
            <div className="col-md-1"></div>
          </div>
        }
        {isLoading &&
          <div className="row">
            <div className="col my-5">
              <p className="text-center dislay-4">Loading... :)</p>
            </div>
          </div>
        }
        {orders.length === 0 && !isLoading &&
          <div className="row">
            <div className="col my-5">
              <p className="text-center">You haven't placed any orders yet...</p>
                <p className="text-center">
                  <span>Fortunately, you can fix that by checking out available items on </span>
                  <Link to="/inventory" type="button" className="btn btn-hubbub btn-sm">Inventory</Link>
                <span> ! You can also</span> <span className="fw-bold text-hubbub">request an item</span> through our form :)!
                  Just click below and we'll try to help you out!
                </p>
                <div className="d-grid gap-2 col-6  mx-auto mt-3">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub btn-lg" target="_blank" rel="noreferrer">Request an Item</a>
                </div>
            </div>
          </div>
        }
      </div>
    </main>
  );
}

export default Rentals;
