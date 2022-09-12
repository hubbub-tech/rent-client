import { useState, useEffect } from 'react';

export const DetailsAddCartButton = ({ itemId, setRentalCost, dtRange }) => {

  const [dtStarted, setDtStarted] = useState(null);
  const [dtEnded, setDtEnded] = useState(null);

  useEffect(() => {
    setDtStarted(dtRange.from);
    setDtEnded(dtRange.to);
  }, [dtRange]);

  const handleAddItem = () => {

    const postData = async(url, pkg) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(pkg),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      setRentalCost(data.est_charge);
    };

    let pkg;
    let url;
    if (dtStarted && dtEnded) {
      pkg = { itemId, dtStarted, dtEnded };
      url = '/cart/add';
    } else {
      pkg = { itemId };
      url = '/cart/add/no-reservation';
    };

    postData(process.env.REACT_APP_SERVER + url, pkg)
    .catch(console.error);
  };

  return (
    <div className="col-md-6 col-10 mx-4 d-grid">
      <button
        type="button"
        className="btn btn-hubbub"
        onClick={handleAddItem}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bag-plus me-2 mb-1"
          viewBox="0 0 16 16"
        >
          <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
        Add to cart
      </button>
    </div>
  );
}
