import { useState, useEffect } from 'react';

import HeartIcon from '../icons/HeartIcon';

const RatingInput = ({ rating, setRating, label }) => {
  const [icons, setIcons] = useState([
    {"size": "2rem", "fill": "grey"},
    {"size": "2rem", "fill": "grey"},
    {"size": "2rem", "fill": "grey"},
    {"size": "2rem", "fill": "grey"},
    {"size": "2rem", "fill": "grey"}
  ])
  const [toggle, setToggle] = useState(true);
  const updateRating = (value) => {
    setRating(value);
    for (let i = 0; i < value; i++) {
      setIcons([
        ...icons, {"size": "3rem", "fill": "red"}
      ]);
    }
  }
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {icons.map((icon, index) => (
          <HeartIcon
            size={icon.size}
            fill={icon.fill}
            key={`heart-${index}`}
            onClick={index => updateRating(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingInput;
