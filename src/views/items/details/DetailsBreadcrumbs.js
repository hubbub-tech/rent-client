import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const DetailsBreadcrumbs = ({ item }) => {

  return (
    <nav aria-label="breadcrumb mb-5">
    {item.name
      ? <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><a className="hubbub-link" href="/items/feed">Inventory</a></li>
          <li className="breadcrumb-item active" aria-current="page">{ item.name }</li>
        </ol>
      : <Skeleton width="25%" />
    }
    </nav>
  );
}
