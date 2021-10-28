import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import CartIcon from '../icons/CartIcon';
import SearchForm from '../forms/SearchForm';

const Navbar = ({ isLoggedIn }) => {
  const history = useHistory();
  const hubbubId = Cookies.get('hubbubId');
  const cartSize = Cookies.get('cartSize');

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const onClickCheckout = () => history.push('/checkout');
  return (
    <nav className="navbar navbar-expand-lg navbar-light hubbub-background">
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
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed && 'collapse'} navbar-collapse`} id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
              <a className="nav-link active fw-bold" aria-current="page" href="/inventory">Rent Now</a>
            </li>
            {isLoggedIn &&
              <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
                <a className="nav-link" href={`/accounts/u/id=${ hubbubId }`}>My Profile</a>
              </li>
            }
            {isLoggedIn &&
              <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
                <a className="nav-link" href="/accounts/u/orders">My Rentals</a>
              </li>
            }
            {isLoggedIn &&
              <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
                <a className="nav-link" href="/logout">Logout</a>
              </li>
            }
            {!isLoggedIn &&
              <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
                <a className="nav-link" href="/login">Login</a>
              </li>
            }
            {!isLoggedIn &&
              <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
                <a className="nav-link" href="/register">Sign Up</a>
              </li>
            }
          </ul>
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            {isLoggedIn && !isNavCollapsed &&
              <li className="nav-item mb-2 mx-auto">
                <a className="nav-link" href="/checkout">Cart ({ cartSize })</a>
              </li>
            }
            <SearchForm />
            {isNavCollapsed &&
              <CartIcon fill={"black"} size={"2rem"} onClick={onClickCheckout} />
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
