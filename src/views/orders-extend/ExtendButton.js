import { useState } from 'react';

export const ExtendButton = ({ dtEnded, orderId }) => {

  const handleExtend = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          orderId,
          dtEnded: Math.floor(dtEnded.getTime() / 1000)
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      return response;
    };

    const cacheData = async(response) => {
      const responseClone = response.clone();
      const data = await responseClone.json();

      if (response.ok) {
        const tryRedirect = () =>  window.location.href = data.redirect_url;
        const extensionCache = await caches.open('extensionData');

        extensionCache.delete(process.env.REACT_APP_SERVER + '/extend/success');
        extensionCache.put(process.env.REACT_APP_SERVER + '/extend/success', response)
        .then(tryRedirect)
        .catch(console.error);
      }
    };

    postData(process.env.REACT_APP_SERVER + '/orders/extend/validate')
    .then(cacheData)
    .catch(console.error);
  };

  return (
    <button
      type="button"
      onClick={handleExtend}
      className="btn btn-success btn-sm"
      disabled={dtEnded === null}
    >
      Extend
    </button>
  );
}
