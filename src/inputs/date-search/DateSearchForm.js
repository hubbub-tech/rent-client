import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DateSearchInput } from './DateSearchInput';

export const DateSearchForm = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(null);

  const defaultSelectedRange = { from: undefined, to: undefined };
  const [selectedRange, setSelectedRange] = useState(defaultSelectedRange);

  const handleSearch = (e) => {
    e.preventDefault();

    const fromTimestamp = (selectedRange.from) ? selectedRange.from.getTime() / 1000 : null;
    const toTimestamp = (selectedRange.to) ? selectedRange.to.getTime() / 1000 : null;

    let url = '/items/feed?';

    url = url.concat(searchTerm ? `search=${searchTerm}&` : '');

    if (fromTimestamp && toTimestamp) {
      url = url.concat(fromTimestamp ? `ts_start=${fromTimestamp}&` : '');
      url = url.concat(toTimestamp ? `ts_end=${toTimestamp}` : '');
    }
    
    navigate(url);
  }

  return (
    <div className="container">
      <div className="container">
        <div className="row d-flex">
          <div className="col-12 my-3 text-center">
            <h3 className="mb-2 fw-bold">Find what you're looking for</h3>
          </div>
        </div>
      </div>
      <DateSearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        handleSearch={handleSearch}
      />
    </div>
  );
}
