export const MainRequestItem = ({ image }) => {
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
            <h3 className="fw-bold text-dark mb-1">Looking for Somthing Specific?
            </h3>
            <p className="mb-4 text-dark">Request it here, and we'll help you get it!</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-dark">Request an Item</a>
          </div>
        </div>
      </div>
    </div>
  );
}
