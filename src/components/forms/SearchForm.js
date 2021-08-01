import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchForm = () => {
  const history = useHistory();
  const [search, setSearch] = useState("all");

  const submit = (e) => {
    e.preventDefault();
    history.push(`/inventory/search=${search}`);
  }
  return (
    <form className="d-flex" onSubmit={submit} >
      <div className="input-group mx-5">
        <input
          type="text"
          className="form-control border-dark"
          name="search"
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          aria-label="Search items..."
          minLength="1"
          maxLength="29"
          aria-describedby="button-addon2" />
        <button
          className="btn btn-neutral"
          type="submit"
          id="button-addon2">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
