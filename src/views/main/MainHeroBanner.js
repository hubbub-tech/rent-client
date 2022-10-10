export const MainHeroBanner = ({ background }) => {
  return (
    <div
      style={{
        background,
        backgroundSize: "cover",
        borderRadius: ".5rem",
        backgroundPosition: "center"
      }}
    >
      <div className="ps-lg-4 py-lg-5 col-lg-5 col-md-7 py-5 px-5 text-xs-center">
        <span className="badge text-bg-warning">Opening Sale Discount 50%</span>

        <h2 className="text-dark display-5 fw-bold mt-4">SuperMarket For Fresh Grocery </h2>
        <p className="lead">Introduced a new model for online grocery shopping
          and convenient home delivery.</p>
        <a href="#!" className="btn btn-dark mt-3">Shop Now {"->"}</a>
      </div>

    </div>
  );
}
