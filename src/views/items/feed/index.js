import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FeedBanner } from './FeedBanner';
import { FeedGrid } from './FeedGrid';
import { FeedItemFilter } from './FeedItemFilter';
import { FeedSortOptions } from './FeedSortOptions';
import { FeedCoordsInput } from './FeedCoordsInput';

import { SessionContext } from '../../../providers/SessionProvider';

import AOS from 'aos';
import 'aos/dist/aos.css';

// CONSTANTS



export const Index = () => {
  // NOTE: search params will include 'search', 'page', and 'limit'
  let [searchParams, setSearchParams] = useSearchParams();
  const { userId } = useContext(SessionContext);

  // NOTE: pass around feedItems and setFeedItems for
  const defaultCoords = { "lat": null, "lng": null };
  const [coords, setCoords ] = useState(defaultCoords);

  const [items, setItems] = useState([]);
  const [feedItems, setFeedItems] = useState([]);

  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    AOS.init({duration : 500, once: true});

    const paramsString = searchParams.toString();

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const responseClone = response.clone();
      const data = await responseClone.json();

      setCoords({ "lat": data.user_address_lat, "lng": data.user_address_lng });

      setItems(data.items);
      setFeedItems(data.items);

      return response;
    };

    const cacheData = async(response) => {
      if (response.ok) {
        const feedCache = await caches.open('feedData');

        feedCache.delete(process.env.REACT_APP_SERVER + '/items/feed');
        feedCache.put(process.env.REACT_APP_SERVER + '/items/feed', response)
        .catch(console.error);
      }
    };

    const getCachedData = async(url) => {
      const cacheStorage = await caches.open('feedData');
      const cachedResponse = await cacheStorage.match(url);
      const cachedData = await cachedResponse.json();

      if (cachedData) {
        setCoords({ "lat": cachedData.user_address_lat, "lng": cachedData.user_address_lng });
        setItems(cachedData.items);
        setFeedItems(cachedData.items);
      } else {
        getData(process.env.REACT_APP_SERVER + `/items/feed?${paramsString}`)
        .then(cacheData)
        .catch(console.error);
      }
    };

    getCachedData(process.env.REACT_APP_SERVER + '/items/feed')
    .catch(console.error);

  }, [searchParams]);


  const handleOrderByProximity = () => {
    const orderByProximity = (a, b) => {

      const aLat = parseInt(a.address_lat);
      const aLng = parseInt(a.address_lng);

      const bLat = parseInt(b.address_lat);
      const bLng = parseInt(b.address_lng);


      const distToA2 = Math.pow(aLat - coords.lat, 2) + Math.pow(aLng - coords.lng, 2);
      const distToA = Math.pow(distToA2, 0.5);

      const distToB2 = Math.pow(bLat - coords.lat, 2) + Math.pow(bLng - coords.lng, 2);
      const distToB = Math.pow(distToB2, 0.5);

      return (distToA > distToB)
        ? 1
        : (distToA === distToB && a.is_featured && b.is_featured === false) ? 1 : -1;
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


  useEffect(() => {
    if (orderBy === 'proximity') handleOrderByProximity();
    else if (orderBy === 'availability') handleOrderByAvailability();
    else if (orderBy === 'featured') handleOrderByFeatured();
    else setFeedItems([...items]);

  }, [orderBy, coords]);


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
            <div className="col-lg-4 col-md-6 col-12">
              <FeedSortOptions
                location={coords}
                setOrderBy={setOrderBy}
              />
            </div>
          </div>
          {orderBy === "proximity" &&
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <FeedCoordsInput setCoords={setCoords} />
              </div>
            </div>
          }
          <div className="row">
            <div className="col-12 mb-md-5">
              <FeedGrid items={feedItems} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
