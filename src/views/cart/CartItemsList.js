import { useState, useEffect } from 'react';

import { CartEmpty } from './CartEmpty';
import { CartReservedItem } from './CartReservedItem';
import { CartUnreservedItem } from './CartUnreservedItem';

export const CartItemsList = ({ unreservedItems, reservedItems }) => {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(unreservedItems.length === 0 && reservedItems.length === 0);
  }, [unreservedItems, reservedItems]);
  return (
    <div className="container my-3">
      <div className="row">
      {unreservedItems.map((item, index) => (
        <CartUnreservedItem key={item.id} item={item} />
      ))}
      {reservedItems.map((item, index) => (
        <CartReservedItem key={item.id} item={item} />
      ))}
      { isEmpty && <CartEmpty /> }
      </div>
    </div>
  );
}
