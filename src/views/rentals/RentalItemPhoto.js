export const RentalItemPhoto = (props) => {
  if (window.location.href.includes("localhost")) {
    return (
      <a href={props.href}>
        <img
          src="/static/items/stock.jpg"
          className={props.className}
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
          className={props.className}
          onClick={props.onClick}
          alt={props.alt}
        />
      </a>
    );
  }
}
