export const MainPerksItem = ({ src }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="mb-5 mb-xl-0">
        <div className="mb-3"><img src={src} alt=""/></div>
        <h3 className="h5 mb-3">
          10 minute grocery now
        </h3>
        <p>Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
      </div>
    </div>
  );
}
