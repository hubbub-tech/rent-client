import { ListImagePhoto } from './ListImagePhoto';

export const ListImageOutput = ({ imageURLs, setImageURLs }) => {
  return (
    <div className="container">
      <div className="row">
      {imageURLs.map((imageURL, index) => (
        <div className="col-4" key={imageURL}>
          <ListImagePhoto
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
