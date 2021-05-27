import React from 'react';

const CategoryCard = (category) => {
  const categoryLink = "/inventory" + category.link
  const categoryTitle = category.title
  const categorySourceLink = "static/items/" + category.title + ".png"
  const categoryAltText = category.alt
  return (
    <div className="col-md-2 col-6 mb-1">
      <a className="custom-card" href={categoryLink}>
        <h6 className="text-center mt-2">{categoryTitle}</h6>
        <img className="img-fluid rounded shadow zoom-in" src={categorySourceLink} alt={categoryAltText} />
      </a>
    </div>
  );
}

export default CategoryCard;
