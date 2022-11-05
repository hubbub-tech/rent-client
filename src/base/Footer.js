export const Footer = () => {
  return (
    <footer
      className="font-small pt-4"
      style={{"backgroundColor": "#000000"}}>
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
                <a className="hubbub-link" href="/inventory" target="_blank" rel="noreferrer">Inventory</a>
              </li>
              <li>
                <a className="hubbub-link" href="/checkout">My Cart</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">List</h5>
            <ul className="list-unstyled">
              <li>
                <p className="text-hubbub">Coming Soon!</p>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">About</h5>
            <ul className="list-unstyled">
              <li>
                <a className="hubbub-link" href="mailto:hello@hubbub.shop">Contact Us</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/document/d/1kAOBVmgYaBEq_cEQiJqARuJUUviSENLr_Y0QeaD-Yik/edit?usp=sharing" target="_blank" rel="noreferrer">Press</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/forms/d/e/1FAIpQLSditMuAN0y7ExiZ2_51XRk4pDR2GbTYwwyqJgtsknLBXo75Iw/viewform" target="_blank" rel="noreferrer">Join the Team</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase text-white">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a className="hubbub-link" href="/faqs">FAQs</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/document/d/1rRKafml--o5q6L3HA8EtFHCedQTncR8rUZhAeVsEqfI/edit?usp=sharing" target="_blank" rel="noreferrer">Community Guidelines</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/document/d/1HVTqo46FFZu-P12gfrb7o6a83VDANyzGNfMyR_FFxOE/edit?usp=sharing" target="_blank" rel="noreferrer">Terms of Service & Privacy Policy</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/forms/d/e/1FAIpQLSe5gWyZ6XtGYhMk8n_pPbxVtt8_YhEh139BTRydbF4XCkVHJg/viewform" target="_blank" rel="noreferrer">Leave Feedback</a>
              </li>
              <li>
                <a className="hubbub-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfs-6Mz3Sf2u846yenTpMOvIyNbQSnrHjx8jpPck0bUcWRuZQ/viewform" target="_blank" rel="noreferrer">Report a User</a>
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
      <div className="text-center py-3">
        <span className="text-white">© 2022 Copyright: </span>
        <a className="hubbub-link" href="https://www.hubbub.shop/">hubbub.shop</a>
      </div>
    </footer>
  );
}
