import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ItemSearchInput = () => {
  const navigate = useNavigate();

  const defaultSearchTerm = "living";
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const handleSearch = async(e) => {
    e.preventDefault();
    navigate(`/items/feed?search=${searchTerm}`);
  }

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2 border-dark"
        onChange={handleSearchInput}
        type="search"
        placeholder="Search"
        aria-label="Search"
        minLength="1"
        maxLength="29"
      />
      <button
        className="btn btn-dark"
        type="submit"
        id="button-addon1"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
}
