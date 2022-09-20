import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FeedBanner } from './FeedBanner';
import { FeedGrid } from './FeedGrid';
import { FeedItemFilter } from './FeedItemFilter';
import { FeedSortOptions } from './FeedSortOptions';

import { AppContext } from '../../../App';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Index = () => {
  // NOTE: search params will include 'search', 'page', and 'limit'
  let [searchParams, setSearchParams] = useSearchParams();
  const { userId } = useContext(AppContext);

  // NOTE: pass around feedItems and setFeedItems for
  const [zipCode, setZipCode] = useState();

  const [items, setItems] = useState([]);
  const [feedItems, setFeedItems] = useState([]);

  const [srcUrl, setSrcUrl] = useState(null);
  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    AOS.init({duration : 500, once: true});

    const paramsString = searchParams.toString();

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setZipCode(10003);
      setItems(data.items);
      setFeedItems(data.items);
      setSrcUrl(data.photo_url);
    };

    getData(process.env.REACT_APP_SERVER + `/items/feed?${paramsString}`)
    .catch(console.error);
  }, [searchParams]);

  useEffect(() => {
    const handleOrderByProximity = () => {
      const orderByProximity = (a, b) => {

        const userZipCode = zipCode;

        const zipCodeItemA = parseInt(a.address_zip);
        const zipCodeItemB = parseInt(b.address_zip);

        const distToA = Math.abs(zipCodeItemA - userZipCode);
        const distToB = Math.abs(zipCodeItemB - userZipCode);

        if (a.is_featured && b.is_featured === false) return 1;
        return (distToA > distToB) ? 1 : -1;
      };

      setFeedItems([...feedItems].sort(orderByProximity));
    };

    const handleOrderByAvailability = () => {
      const orderByAvailability = (a, b) => {
        return (a.next_available_start > b.next_available_start) ? 1 : -1;
      };

      setFeedItems([...feedItems].sort(orderByAvailability));
    };

    const handleOrderByFeatured = () => {
      const orderByFeatured = (a, b) => {
        return (a.is_featured) && -1;
        return 1;
      };

      setFeedItems([...feedItems].sort(orderByFeatured));
    };

    if (orderBy === 'proximity') handleOrderByProximity();
    else if (orderBy === 'availability') handleOrderByAvailability();
    else if (orderBy === 'featured') handleOrderByFeatured();
    else setFeedItems([...items]);

  }, [orderBy]);


  return (
    <main>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <FeedBanner />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <FeedSortOptions setOrderBy={setOrderBy} />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-md-5">
              <FeedGrid items={feedItems} src={srcUrl} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
