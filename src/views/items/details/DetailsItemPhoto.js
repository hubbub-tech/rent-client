import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const DetailsItemPhoto = (props) => {

  const onMouseMove = (e) => {
    function zoomImg(e) {
      let zoomer = e.currentTarget;
      let offsetX, offsetY;

      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
      e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX;

      const x = offsetX / zoomer.offsetWidth * 100;
      const y = offsetY / zoomer.offsetHeight * 100;
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
    };
  };

  const [imgSrc, setImgSrc] = useState(undefined);

  useEffect(() => {
    (window.location.href.includes("localhost"))
      ? setImgSrc("/static/items/stock.jpg")
      : setImgSrc(props.src);
  }, [imgSrc]);

  return (imgSrc)
    ? <a href={props.href}>
        <img
          src={imgSrc}
          onMouseMove={onMouseMove}
          className={`zoom ${props.className}`}
          onClick={props.onClick}
          alt={props.alt}
        />
      </a>
    : <Skeleton height="100%" className="img-fluid py-3 px-3" />
}
