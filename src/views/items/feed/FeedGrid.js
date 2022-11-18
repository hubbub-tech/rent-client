import { useState, useEffect } from 'react';

import { FeedItemCard } from './FeedItemCard';
import { FeedSkeletonCard } from './FeedSkeletonCard';

export const FeedGrid = ({ items = [] }) => {

  const [skeletonItem, setSkeletonItem] = useState({});

  return (items.length > 0)
    ? <div className="row row-cols-lg-3 row-cols-1">
      { items.map((item) => (
        <FeedItemCard key={item.id} item={item} />
      ))}
      </div>
    : <div className="row row-cols-lg-3 row-cols-1">
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
      </div>
}
