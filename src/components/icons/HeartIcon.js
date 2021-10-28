const HeartIcon = ({ fill = 'black', size = '16', onClick = null }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      className="bi bi-heart-fill mx-1"
      viewBox="0 0 16 16"
      onClick={onClick}
    >
      <path
        fill-rule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );
}

export default HeartIcon;
