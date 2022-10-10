import { useEffect } from 'react';

import { FeedItemCard } from './FeedItemCard';
import { FeedEmpty } from './FeedEmpty';

export const FeedGrid = ({ items = [] }) => {

  if (items.length > 0) {
    return (
      <div className="row row-cols-lg-3 row-cols-1">
      { items.map((item) => (
        <FeedItemCard key={item.id} item={item} />
      ))}
      </div>
    );
  } else {
    return (
      <FeedEmpty />
    );
  }
}
