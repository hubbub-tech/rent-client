import React from 'react';

const ListerShareModal = () => {
  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Share to Facebook</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Copy the blurb below and share to Facebook. Let your friends know where to find your stuff!</p><hr>
            <p>"Check out my {{ item.name }} on Hubbub! You can rent it by following  my link, <a href="/inventory/item.{{ item.id }}">http://www.hubbub.shop/inventory/item.{{ item.id }}</a>!"</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <a className="btn btn-primary" href='https://www.facebook.com/' target="_blank" role="button">Go to Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListerShareModal;
