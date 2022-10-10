import { useState, useEffect, useMemo, Fragment } from 'react';

export const ListImageInput = ({ imageURLs, setImageURLs, imageBase64s, setImageBase64s }) => {
  const [image, setImage] = useState(null);

  const addImageURL = (e) => {
    const image = e.target.files[0];

    if (image !== null) {
      let newImageURL = URL.createObjectURL(image);
      setImageURLs([...imageURLs, newImageURL]);

      let reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = function() {
        let newImageBase64 = reader.result;
        setImageBase64s([...imageBase64s, newImageBase64]);
      };
    }
  };

  return (
    <input
      className="mb-3"
      type="file"
      accept="image/*"
      onChange={addImageURL}
      disabled={imageURLs.length >= 3}
    />
  );
}
