import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const DetailsItemDescription = ({ item }) => {
  return (
    <div className="my-8 mx-2">
      <div className="mb-5">
        {/*<!-- text -->*/}
        <h4 className="mb-1">Description</h4>
        {item.description
          ? <p className="mb-0">
              { item.description }
            </p>
          : <Skeleton count={3} />
        }

      </div>
      <div className="mb-5">
        <h5 className="mb-1">Storage Tips</h5>
        {item.description
          ? <p className="mb-0">
              At the end of your rental, remember to give your item a clean because we'll likely be taking it to
              the next renter!
            </p>
          : <Skeleton count={3} />
        }
      </div>
      <div>
        <h5 className="mb-1">Disclaimer</h5>
        {item.description
          ? <p className="mb-0">
          Hubbub runs on secondhand items. We aim to give old items new life :)! If you have any issues with your item
          reach out to us and we'll help you STAT.
            </p>
          : <Skeleton count={3} />
        }
      </div>
    </div>
  );
}
