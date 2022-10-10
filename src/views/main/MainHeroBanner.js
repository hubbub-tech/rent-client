export const MainHeroBanner = ({ image }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        borderRadius: ".5rem",
        backgroundPosition: "center"
      }}
    >
      <div className="ps-lg-4 py-lg-5 col-lg-5 col-md-7 py-5 px-5 text-xs-center">
        <span className="badge text-bg-warning">New featured items available now!</span>

        <h2 className="text-light display-5 fw-bold mt-4"><span className="text-light">Hubbub</span> For Secondhand </h2>
        <p className="lead text-light">Discover the better, faster, more convenient way to get the items you need.</p>
        <a href="/items/feed" className="btn btn-dark btn-lg mt-3"><span className="text-light">Shop Now {"->"}</span></a>
      </div>

    </div>
  );
}
