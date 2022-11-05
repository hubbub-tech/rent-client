import { useState } from 'react';

export const DetailsBreadcrumbs = ({ item }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><a className="hubbub-link" href="/items/feed">Inventory</a></li>
        <li className="breadcrumb-item active" aria-current="page">{ item.name }</li>
      </ol>
    </nav>
  );
}
