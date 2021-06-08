import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ShopCard from '../cards/ShopCard';

const Shop = ({isSearching}) => {
  const { searchTerm } = useParams();
  const [urlBase, setUrlBase] = useState(null);
  const [items, setItems] = useState([]);
  let fetchUrl = isSearching ? `/inventory/search=${searchTerm}` : '/inventory';

  useEffect(() => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      setUrlBase(data.photo_url);
      setItems(data.items);
    });
  }, [fetchUrl]);

  return (
    <main>
      <div className="container-md">
        <div className="container-md">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11 mt-5">
              <h1>Rent</h1>
              <p>Can’t find what you’re looking for?</p>
              <p>Let us know <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" target="_blank" rel="noreferrer">here</a>, and we’ll try to help you out!</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {items.map((item) => (
            <ShopCard imgPath={urlBase} item={item} key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Shop;
