import React from 'react';

// !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const ItemPhoto = ({ className, src, item, size, onClick = null }) => {
  if (window.location.href.includes("localhost")) {
    return (
      <img
        src="/static/items/stock.jpg"
        className={className}
        onClick={onClick}
        alt={item.name}

      />
    );
  } else {
    return (
      <img
        src={src}
        className={className}
        onClick={onClick}
        alt={item.name}
      />
    );
  }
}

export default ItemPhoto;
