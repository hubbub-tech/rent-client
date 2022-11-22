import backgroundImg from './assets/main-banner.png';

export const MainBanner = () => {
  return (
    <section className="mt-5 mb-3">
      <div className="container">
        <div className="hero-slider py-5">
          <div
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: "cover",
              borderRadius: ".5rem",
              backgroundPosition: "center"
            }}
          >
            <div className="ps-lg-4 py-lg-5 col-lg-5 col-md-7 py-5 px-5 text-xs-center">
              <span className="badge text-bg-warning">New featured items available now!</span>

              <h2 className="text-light display-5 fw-bold mt-4">Rent Anything on <big>Hubbub</big></h2>
              <p className="lead text-light">Discover the better, faster, more convenient way to get the items you need.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
