import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <div className="col my-5">
      <p className="text-center">
        No items in cart. Check out our <Link to="/items/feed" type="button" className="btn btn-hubbub btn-sm">Inventory</Link>
      <span> ! You can also</span> <span className="fw-bold text-hubbub">request an item</span> through our form :)!
        Just click below and we'll try to help you out!
      </p>
      <div className="d-grid gap-2 col-6  mx-auto mt-3">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSflErYv4mNyPlAlPmSEO_q1xmOIYOMmafoI1-te_fx44VvKhw/viewform" className="btn btn-hubbub" target="_blank" rel="noreferrer">Request an Item</a>
      </div>
    </div>
  );
}
