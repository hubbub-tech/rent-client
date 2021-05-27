import React from 'react';

const Footer = () => {
  return (
    <footer
      className="page-footer font-small mt-5 pt-4 footer"
      style={{"backgroundColor": "#666666"}}>
      <div className="container-fluid text-center text-md-start">
        <div className="row pt-3">
          <div className="col-md-4 mt-md-0 mt-3">
            <a className="navbar-brand" href="/">
              <h2 className="text-center display-2 mt-3 text-white">HUBBUB</h2>
            </a>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">Rent</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/inventory" target="_blank" rel="noreferrer">Inventory</a>
              </li>
              <li>
                <a href="/checkout">My Cart</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">List</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/how-to-list">How to List</a>
              </li>
              <li>
                <a href="/become-a-lister">Become a Lister</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">About</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/our-story">Our Story</a>
              </li>
              <li>
                <a href="/callouts">Thank You</a>
              </li>
              <li>
                <a href="https://docs.google.com/document/d/1R_5hmqhHguIqT4Arvi5oNwP6eLbukMhXqabWZSOa2fE/edit?usp=sharing" target="_blank" rel="noreferrer">Our Partnerships</a>
              </li>
              <li>
                <a href="mailto:hubbubcu@gmail.com">Contact Us</a>
              </li>
              <li>
                <a href="https://docs.google.com/document/d/1kAOBVmgYaBEq_cEQiJqARuJUUviSENLr_Y0QeaD-Yik/edit?usp=sharing" target="_blank" rel="noreferrer">Press</a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSditMuAN0y7ExiZ2_51XRk4pDR2GbTYwwyqJgtsknLBXo75Iw/viewform" target="_blank" rel="noreferrer">Join the Team</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/help/faqs">FAQs</a>
              </li>
              <li>
                <a href="https://docs.google.com/document/d/1rRKafml--o5q6L3HA8EtFHCedQTncR8rUZhAeVsEqfI/edit?usp=sharing" target="_blank" rel="noreferrer">Community Guidelines</a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5gWyZ6XtGYhMk8n_pPbxVtt8_YhEh139BTRydbF4XCkVHJg/viewform" target="_blank" rel="noreferrer">Leave Feedback</a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfs-6Mz3Sf2u846yenTpMOvIyNbQSnrHjx8jpPck0bUcWRuZQ/viewform" target="_blank" rel="noreferrer">Report a User</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-3 col-md-10"></div>
          <div className="col-3 col-md-1">
          </div>
          <div className="col-3 col-md-1">
          </div>
          <div className="col-3"></div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">© 2021 Copyright:
        <a href="https://www.hubbub.shop/">hubbub.shop</a>
      </div>
    </footer>
  );
}

export default Footer;
