import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("all");

  const handleClick = async(e) => {
    e.preventDefault();
    navigate(`/items/feed?search=${searchTerm}`);
  }

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2 border-dark"
        onChange={e => setSearchTerm(e.target.value)}
        type="search"
        placeholder="Search"
        aria-label="Search"
        minLength="1"
        maxLength="29"
      />
      <button
        className="btn btn-outline-dark"
        type="submit"
        id="button-addon1"
        onClick={handleClick}
      >
        Search
      </button>
    </form>
  );
}
