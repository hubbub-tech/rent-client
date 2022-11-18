import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const FeedItemPhoto = (props) => {

  const [imgSrc, setImgSrc] = useState(undefined);

  useEffect(() => {
    (process.env.REACT_APP_DEBUG === "true")
      ? setImgSrc("/static/items/stock.jpg")
      : setImgSrc(props.src);
  }, [props.src]);

  return (imgSrc)
    ? <a href={props.href}>
        <img
          src={imgSrc}
          className={props.className}
          onClick={props.onClick}
          alt={props.alt}
        />
      </a>
    : <Skeleton height="100%" className={props.className} />
  }
