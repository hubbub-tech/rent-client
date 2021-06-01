import React from 'react';

const CategoryCard = ({category}) => {
  return (
    <div className="col-md-2 col-6 mb-1">
      <a className="custom-card" href={`/inventory${category.link}`}>
        <h6 className="text-center mt-2">{category.title}</h6>
        <img
          className="img-fluid rounded shadow zoom-in"
          src={`static/items/${category.title}.png`}
          alt={category.alt} />
      </a>
    </div>
  );
}

export default CategoryCard;
