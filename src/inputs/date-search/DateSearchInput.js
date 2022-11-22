import { useState, useEffect, useRef } from 'react';

import { DateSearchPicker } from './DateSearchPicker';
import { printDate } from '../../views/utils.js';

import searchSvg from '../assets/search.svg';


const DateSearchTermInput = ({ placeholder, searchTerm, setSearchTerm }) => {

  const handleSearchTermInput = (e) => setSearchTerm(e.target.value);

  return (
    <div className="form-floating">
      <input
        type="text"
        id="itemSearchTerm"
        className="form-control"
        placeholder={placeholder}
        onChange={handleSearchTermInput}
        value={searchTerm}
      />
      <label htmlFor="itemSearchTerm">Searching for...</label>
    </div>
  )
}


export const DateSearchInput = ({ searchTerm, setSearchTerm, selectedRange, setSelectedRange, handleSearch }) => {

  let dateToday = new Date();
  let dateFuture = new Date();
  dateFuture = new Date(dateFuture.setMonth(dateToday.getMonth() + 3));

  const dateTodayStr = printDate(dateToday.getTime() / 1000);
  const dateFutureStr = printDate(dateFuture.getTime() / 1000);
  const defaultDisplayRange = `${ dateTodayStr } - ${ dateFutureStr }`;
  const [displayRange, setDisplayRange] = useState(defaultDisplayRange);

  const initRangeInputClassName = "form-control text-muted";
  const [rangeInputClassName, setRangeInputClassName] = useState(initRangeInputClassName)

  const handleRangeSelect = (range) => {
    setSelectedRange(range);

    if (range) {
      let updatedFrom = (range.from) ? printDate(range.from.getTime() / 1000) : 'Start';
      let updatedTo = (range.to) ? printDate(range.to.getTime() / 1000) : 'End';

      let updatedRange = `${ updatedFrom } - ${ updatedTo }`;
      setDisplayRange(updatedRange);
      setRangeInputClassName("form-control");
    }
  };

  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const openPopper = () => setIsPopperOpen(true);
  const closePopper = () => setIsPopperOpen(false);

  return (
    <div className="container">
      <div className="row g-2 d-flex justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <DateSearchTermInput
              placeholder="Standing Lamp"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <div className="form-floating">
              <input
                type="text"
                id="itemSearchDates"
                className={rangeInputClassName}
                placeholder={displayRange}
                value={displayRange}
                onClick={openPopper}
                readOnly={true}
              />
              <label htmlFor="itemSearchDates">Start - End</label>
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-success px-3"
            >
              <img src={searchSvg} alt="search" />
            </button>
          </div>
        </div>
      </div>
      <div className="row g-2 d-flex justify-content-center mt-1">
      {isPopperOpen &&
        <div className="col-md-8 col-12 d-flex justify-content-center">
          <div class="card">
            <div class="card-body">
              <DateSearchPicker
                minDate={dateToday}
                defaultMonth={dateToday}
                selectedRange={selectedRange}
                handleRangeSelect={handleRangeSelect}
              />
              <button
                type="button"
                onClick={closePopper}
                className="btn btn-danger"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  );
}
