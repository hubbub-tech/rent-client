import { useState, useEffect } from 'react';

import { ListImageInput } from './ListImageInput';
import { ListImageOutput } from './ListImageOutput';

export const ListImageURLDisplay = ({ imageURLs, setImageURLs, imageBase64s, setImageBase64s }) => {

  useEffect(() => {
    console.log("component re-render!");
  }, [imageURLs]);

  return (
    <div className="col">
      <ListImageInput
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        imageBase64s={imageBase64s}
        setImageBase64s={setImageBase64s} 
      />
      <ListImageOutput
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
      />
    </div>
  );
}
