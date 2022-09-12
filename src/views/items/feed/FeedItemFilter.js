import { useEffect } from 'react';

export const FeedItemFilter = ({ isFiltered, setIsFiltered }) => {

  const handleFilterToggle = () => setIsFiltered(!isFiltered);

  return (
    <div className="form-check form-check-reverse form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
        value="option1"
        onChange={handleFilterToggle}
      />
      <label className="form-check-label" htmlFor="inlineCheckbox1">Featured Items Only</label>
    </div>
  );
}
