import Skeleton from 'react-loading-skeleton'

import { FeedViewItemButton } from './FeedViewItemButton';

import 'react-loading-skeleton/dist/skeleton.css'

export const FeedSkeletonCard = () => {

  return (
    <div data-aos="fade-up" className="card px-0 mx-0 my-0 rounded-0">
      <div className="card-body">
        <div className="row">
          <div className="col-4 mt-2">
            <Skeleton height="100%" className="img-fluid" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12 mb-1">
                  <div className="text-small mb-1">
                    <Skeleton />
                  </div>
                  <Skeleton count={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <FeedViewItemButton itemId={null} disabled={true} />
        </div>
      </div>
    </div>
  );
}
