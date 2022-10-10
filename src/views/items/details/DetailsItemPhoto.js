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

  if (window.location.href.includes("localhost")) {
    return (
      <a href={props.href}>
        <img
          src="/static/items/stock.jpg"
          onMouseMove={onMouseMove}
          className={`zoom ${props.className}`}
          onClick={props.onClick}
          alt={props.alt}
        />
      </a>
    );
  } else {
    return (
      <a href={props.href}>
        <img
          src={props.src}
          onMouseMove={onMouseMove}
          className={`zoom ${props.className}`}
          onClick={props.onClick}
          alt={props.alt}
        />
      </a>
    );
  }
}
