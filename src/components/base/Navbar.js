import React from 'react';
import { useState, useEffect } from 'react';

import SearchForm from '../forms/SearchForm';

const Navbar = ({ userId, isLoggedIn }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [cartSize, setCartSize] = useState(null);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    fetch('/login/cart')
    .then(res => res.json())
    .then(data => setCartSize(data.cart_size));
  }, [cartSize]);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{"backgroundColor": "#69b6e7", "border": "#69b6e7"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h2 className="text-start text-white">HUBBUB</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/inventory">Rent Now</a>
            </li>
            {isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" href={`/accounts/u/id=${ userId }`}>My Profile</a>
              </li>
            }
            {isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" href="/accounts/u/orders">My Rentals</a>
              </li>
            }
            {!isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            }
            {!isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" href="/register">Sign Up</a>
              </li>
            }
          </ul>
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            {isNavCollapsed && <SearchForm />}
            {isNavCollapsed &&
              <a href="/checkout">
                <svg
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 16 16"
                  className="bi bi-cart3 navbar-brand"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </a>
            }
            {isLoggedIn && !isNavCollapsed &&
              <li className="nav-item">
                <a className="nav-link" href="/checkout">Cart ({cartSize})</a>
              </li>
            }
          </ul>
          {isLoggedIn && isNavCollapsed &&
            <span className="badge badge-primary badge-pill mx-2">{cartSize}</span>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
