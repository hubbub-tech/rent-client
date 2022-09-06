import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FeedGrid } from './FeedGrid';
import { FeedSearchBar } from './FeedSearchBar';
import { FeedProxFilter } from './FeedProxFilter';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Index = ({ isSearching }) => {
  // NOTE: search params will include 'search', 'page', and 'limit'
  let [searchParams, setSearchParams] = useSearchParams();

  // NOTE: pass around feedItems and setFeedItems for
  const [items, setItems] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const [srcUrl, setSrcUrl] = useState(null);

  useEffect(() => {
    AOS.init({duration : 500, once: true});

    const paramsString = searchParams.toString();

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setItems(data.items);
      setFeedItems(data.items);
      setSrcUrl(data.photo_url);
    };

    getData(process.env.REACT_APP_SERVER + `/items/feed?${paramsString}`)
    .catch(console.error);
  }, [items]);

  return (
    <main>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <FeedSearchBar />
            </div>
            <div className="col-lg-8 col-sm-6 col-12 d-md-flex justify-content-md-end">
              <FeedProxFilter
                renderedItems={feedItems}
                setRenderedItems={setFeedItems}
                zipCode={10027}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-6">
              <FeedGrid items={items} src={srcUrl} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
