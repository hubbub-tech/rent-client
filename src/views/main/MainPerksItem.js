export const MainPerksItem = ({ perk, src }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="mb-5 mb-xl-0">
        <div className="mb-3"><img src={src} alt=""/></div>
        <h3 className="h5 mb-3 text-light">
          { perk.header }
        </h3>
        <p className="text-light">{ perk.description }</p>
      </div>
    </div>
  );
}
