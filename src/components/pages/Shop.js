import React from 'react';
import { useState, useEffect } from 'react';

import ShopCard from '../cards/ShopCard';
import ShopBanner from '../banners/ShopBanner';

const Shop = () => {
  const [urlBase, setUrlBase] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/inventory').then(res => res.json()).then(data => {
      setUrlBase(data.photo_url);
      setItems(data.items);
    });
  }, []);
  return (
    <main>
      <div className="container-md">
        <ShopBanner />
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
