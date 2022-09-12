import { useEffect } from 'react';

export const FeedBanner = () => {
  const itemRequestLink = "https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform";

  return (
    <div className="col-md-12 mt-md-5 mt-3">
      <h1 className="text-start">Rent</h1>
      <p className="text-start">Can’t find what you’re looking for?</p>
      <span>You can </span>
      <a
        href={itemRequestLink}
        className="btn btn-hubbub btn-sm"
        target="_blank"
        rel="noreferrer"
      >
        Request an Item
      </a>
      <span> and we’ll try to help!</span>
    </div>
  );
}
