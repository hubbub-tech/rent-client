import { useState, useEffect, Fragment } from 'react';

export const ListImagePhoto = ({ imageURL, index, imageURLs, setImageURLs, className }) => {

  const removeImageURL = () => {
    let editableImageURLs = [...imageURLs];
    editableImageURLs.splice(index, 1);

    setImageURLs(editableImageURLs);
  };

  return (
    <Fragment>
      <div className=" position-absolute mt-1 start-1">
        <button type="button" className="btn btn-danger btn-sm ms-1" onClick={removeImageURL}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
      <img src={imageURL} className={className} />
    </Fragment>
  );
}
