export const MainSecondhandSell = ({ image }) => {
  return (
    <div className="col-12 col-md-6 mb-3 mb-lg-0">
      <div>
        <div className="py-5 px-5 rounded-3"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="fw-bold text-dark mb-1">Selling Your Stuff?
            </h3>
            <p className="mb-4 text-dark">You can get some money and help the Earth out!</p>
            <a href="https://docs.google.com/forms/d/1rVes9pErXKBSraE2G0O27Y7Z9drQoxqFxqV3uuRuBHA/viewform" className="btn btn-dark">Sell to Hubbub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
