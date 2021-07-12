import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import MicroCard from '../cards/MicroCard';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Shop = ({ isSearching }) => {
  const { searchTerm } = useParams();
  const [urlBase, setUrlBase] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let fetchUrl = isSearching ? `/inventory/search=${searchTerm}` : '/inventory';

  useEffect(() => {
    AOS.init({duration : 500, once: true});

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      setUrlBase(data.photo_url);
      setItems(data.items);
      setIsLoading(false);
    });
  }, [fetchUrl]);
  return (
    <main>
      <div className="container-md">
        <div className="container-md">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 mt-5">
              <h1 className="text-start">Rent</h1>
              <p className="text-start">Can’t find what you’re looking for?</p>
              {items.length !== 0 && <p className="text-start">You can <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub btn-sm" target="_blank" rel="noreferrer">Request an Item</a> and we’ll try to help you out!</p>}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <hr />
        <div className="row">
          {items.length !== 0 && items.map((item) => (
            <div className="col-sm-6" key={item.id}>
              <MicroCard urlBase={urlBase} item={item} />
            </div>
          ))}
          {items.length === 0 && !isLoading &&
            <div className="col my-5">
              <p className="text-center">
                Unfortunately, nothing came up :(... If possible, <span className="fw-bold text-hubbub">search for a more
                general word</span> or check out all of our offerings on <Link to="/inventory" type="button" className="btn btn-hubbub btn-sm">Inventory</Link>
              <span> ! You can also</span> <span className="fw-bold text-hubbub">request an item</span> through our form :)!
                Just click below and we'll try to help you out!
              </p>
              <div className="d-grid gap-2 col-6  mx-auto mt-3">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub btn-lg" target="_blank" rel="noreferrer">Request an Item</a>
              </div>
            </div>
          }
          {isLoading &&
            <div className="col my-5">
              <p className="text-center dislay-4">Loading... :)</p>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default Shop;
