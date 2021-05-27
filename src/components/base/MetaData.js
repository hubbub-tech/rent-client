import React from 'react';

const MetaData = (pageName) => {
  return (
    <div>
      <link rel="shortcut icon" href="../static/icons/favicon.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
      <meta property="og:image" content="../static/icons/hubbub_share_banner.png"/>
      <meta name="description" content="The most convenient item-sharing platform for rentals within communities."/>
      <title>{pageName}</title>
    </div>
  );
}

export default MetaData;
