import { useEffect } from 'react';

export const FeedSortOptions = ({ zipCode = '10027', setOrderBy }) => {

  const handleOrderBy = (e) => setOrderBy(e.target.value);

  return (
    <div className="input-group input-group-reverse my-3">
      <select className="form-select" onChange={handleOrderBy} id="inputGroupSelect02">
        <option value="default" defaultValue={true}>Sort Results By...</option>
        <option value="proximity">Proximity to Zip: { zipCode }</option>
        <option value="featured">Featured</option>
        <option value="availability">Next Available Date</option>
      </select>
      <label className="input-group-text" htmlFor="inputGroupSelect02">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
        </svg>
      </label>
    </div>
  );
}
