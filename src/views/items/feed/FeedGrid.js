import { useState, useEffect } from 'react';

import { FeedEmpty } from './FeedEmpty';
import { FeedItemCard } from './FeedItemCard';
import { FeedSkeletonCard } from './FeedSkeletonCard';

export const FeedGrid = ({ items = [], isLoading }) => {

  useEffect(() => {
    console.log("Items have loaded!")
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="row row-cols-lg-3 row-cols-1">
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
      </div>
    )
  } else if (items.length > 0) {
    return (
      <div className="row row-cols-lg-3 row-cols-1">
      { items.map((item) => (
        <FeedItemCard key={item.id} item={item} />
      ))}
      </div>
    )
  } else {
    return <FeedEmpty />
  }
}
