import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FeedItemPhoto } from './FeedItemPhoto';
import { FeedItemBadge } from './FeedItemBadge';
import { FeedViewItemButton } from './FeedViewItemButton';

import { ItemQuoteInput } from '../ItemQuoteInput';
import { printDate, printMoney } from '../utils.js';

export const FeedItemCard = ({ src, item }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/inventory/i/id=${item.id}`);
  return (
    <div data-aos="fade-up" className="card px-0 mx-0 my-0 rounded-0">
      <div className="card-body">
        <div className="row">
          <div className="col-4 mt-2">
            {item.is_featured && <FeedItemBadge />}
            <FeedItemPhoto
              href={`/item/${item.id}`}
              src={src}
              className="img-fluid"
              alt={item.name}
            />
          </div>

          <div className="col-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12 mb-1">
                  <div className="text-small mb-1">
                    <a href="#" className="text-decoration-none text-muted">
                      <small>Next available {printDate(item.next_available_start)}</small>
                    </a>
                  </div>
                  <h2 className="fs-6 card-title">{item.name}</h2>
                  <ItemQuoteInput price={item.retail_price} />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-1">
          <FeedViewItemButton itemId={item.id} />
        </div>
      </div>
    </div>
  );
}
