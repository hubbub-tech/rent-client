import { useState, useEffect } from 'react';

import { CartEmpty } from './CartEmpty';
import { CartReservedCard } from './CartReservedCard';
import { CartUnreservedCard } from './CartUnreservedCard';

export const CartItemsList = ({ unreservedItems, reservedItems }) => {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(unreservedItems.length === 0 && reservedItems.length === 0);
  }, [unreservedItems, reservedItems]);
  return (
    <div className="container">
      <div className="row">
      {unreservedItems.map((item, index) => (
        <div key={item.id} className="col-12">
          <CartUnreservedCard item={item} />
        </div>
      ))}
      {reservedItems.map((item, index) => (
        <div key={item.id} className="col-12">
          <CartReservedCard item={item} />
        </div>
      ))}
      { isEmpty && <CartEmpty /> }
      </div>
    </div>
  );
}
