import { ImageUploadPreview } from './ImageUploadPreview';

export const ImageUploadOutput = ({ imageURLs, setImageURLs }) => {
  return (
    <div className="container">
      <div className="row">
      {imageURLs.map((imageURL, index) => (
        <div className="col-4" key={imageURL}>
          <ImageUploadPreview
            index={index}
            imageURL={imageURL}
            imageURLs={imageURLs}
            setImageURLs={setImageURLs}
            className="img-fluid"
          />
        </div>
      ))}
      </div>
    </div>
  );
}
