import { Fragment } from 'react';

import cancelSvg from '../assets/cancel.svg'

export const ImageUploadPreview = ({ index, imageURL, imageURLs, setImageURLs, className }) => {

  const removeImageURL = () => {
    let editableImageURLs = [...imageURLs];
    editableImageURLs.splice(index, 1);

    setImageURLs(editableImageURLs);
  };

  return (
    <Fragment>
      <div className=" position-absolute mt-1 start-1">
        <button type="button" className="btn btn-danger btn-sm ms-1" onClick={removeImageURL}>
          <img src={cancelSvg} alt="cancel" />
        </button>
      </div>
      <img src={imageURL} className={className} />
    </Fragment>
  );
}
