import { useEffect } from 'react';

import filterSvg from '../assets/filter.svg';

export const FeedSortOptions = ({ location, setOrderBy }) => {

  const handleOrderBy = (e) => setOrderBy(e.target.value);

  return (
    <div className="input-group input-group-reverse my-3">
      <select className="form-select" onChange={handleOrderBy} id="inputGroupSelect02">
        <option value="default" defaultValue={true}>Sort Results By...</option>
        <option value="featured">Featured</option>
        <option value="availability">Next Available Date</option>
        {location && <option value="proximity">Proximity to You</option>}
      </select>
      <label className="input-group-text" htmlFor="inputGroupSelect02">
        <img src={filterSvg} alt="filter-icon" />
      </label>
    </div>
  );
}
