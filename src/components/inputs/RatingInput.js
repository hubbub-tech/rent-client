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
      icons[i].size = "3rem";
      icons[i].fill = "red";
    }
    setToggle(!toggle);
  }
  useEffect(() => {
    console.log("hey")
    // Refresh the component;
  }, [toggle]);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {icons.map((icon, index) => (
          <HeartIcon
            key={`heart-${index}`}
            size={icon.size}
            fill={icon.fill}
            onClick={index => updateRating(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingInput;
