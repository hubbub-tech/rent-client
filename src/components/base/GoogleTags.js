//react doesn't support script tag
import React from 'react';

const tagManager = "https://www.googletagmanager.com/gtag/js?id=UA-173171916-1"

const configDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-173171916-1');
}

const tagAnalytics = () => {
  function (w,d,s,l,i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l: '';

    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j,f);
  }
  ()(window,document,'script','dataLayer','GTM-TXDSNJ5');
}

const GoogleAnalyticsAPI = () => {
  return (
    <div></div>
  );
}
