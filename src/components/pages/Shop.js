import React from 'react';
import ShopCard from '../cards/ShopCard';
import ShopBanner from '../banners/ShopBanner';

const Shop = ({urlBase, items, listers}) => {
  return (
    <main>
      <div className="container-md">
        <ShopBanner />
        <hr />
        <div class="row">
          {items.map((item) => (
            <ShopCard
              imgPath={urlBase} 
              item={item}
              lister={listers[item.lister_id]}
              key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Shop;
