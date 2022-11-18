import { useState, useEffect, Fragment } from 'react';

export const ImageUploadInput = ({ imageURLs, setImageURLs, imageBase64s, setImageBase64s, maxUpload }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(imageURLs.length >= maxUpload);
  }, [imageURLs]);

  const addImageURL = (e) => {
    const image = e.target.files[0];

    if (image) {
      let newImageURL = URL.createObjectURL(image);
      setImageURLs([...imageURLs, newImageURL]);

      let reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = function() {
        let newImageBase64 = reader.result;
        setImageBase64s([...imageBase64s, newImageBase64]);
      };
    };
  };

  return (
    <input
      type="file"
      accept="image/*"
      className="mb-3"
      onChange={addImageURL}
      disabled={isDisabled}
    />
  );
}
