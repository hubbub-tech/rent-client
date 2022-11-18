import { useEffect } from 'react';

import { ImageUploadInput } from './ImageUploadInput';
import { ImageUploadOutput } from './ImageUploadOutput';

export const ImageUploader = ({ imageURLs, setImageURLs, imageBase64s, setImageBase64s }) => {

  useEffect(() => {
    console.log("Re-render image view!");
  }, [imageURLs]);

  return (
    <div className="col">
      <ImageUploadInput
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        imageBase64s={imageBase64s}
        setImageBase64s={setImageBase64s}
        maxUpload={3}
      />
      <ImageUploadOutput
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
      />
    </div>
  );
}
