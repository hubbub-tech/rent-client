import React from 'react';

const LogInLinks = (isLoggedIn) => {
  if (isLoggedIn) {
    return (
      <li class="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="/account/u.{{ g.user.id }}">View Profile</a>
            <a className="dropdown-item" href="/account/u.edit">Edit Profile</a>
            <a className="dropdown-item" href="/account/u.password">Change Password</a>
            <a className="dropdown-item" href="/return/logistics">Returns Scheduling</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/checkout">My Cart</a>
            <a className="dropdown-item" href="/logout">Logout</a>
          </ul>
        </li>
    );
  } else {
    return (
      <div>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Sign Up</a>
          </li>
        </div>
    );
  }
}

const CartFill = () => {
  return <span class="badge badge-primary badge-pill mx-2">100</span>
}

const Navbar = (isLoggedIn) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={
        {"background-color": "#69b6e7",
        "border": "#69b6e7"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h2 className="text-start text-white">HUBBUB</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/inventory">Rent</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/become-a-lister">List</a>
            </li>
            <LogInLinks isLoggedIn={isLoggedIn} />
          </ul>
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <a href="/checkout">
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 16 16"
                className="bi bi-cart3 navbar-brand"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
            </a>
          </ul>
          <CartFill />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
