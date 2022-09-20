import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { AppContext } from '../App';
import { SearchBar } from './SearchBar';


const NavbarToggleButton = ({ isOpen, handleClickOpen }) => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      onClick={handleClickOpen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
  );
}


export const Navbar = () => {
  const navigate = useNavigate();

  const { userId } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => setIsOpen(!isOpen);
  const handleClickCart = () => navigate('/cart');

  const handleLogout = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      Cookies.remove('sessionToken');
      Cookies.remove('userId');
    } else {
      const configs = { domain: '.hubbub.shop'};
      Cookies.remove('sessionToken', configs);
      Cookies.remove('userId', configs);
      Cookies.remove('sessionToken');
      Cookies.remove('userId');
    }

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg hubbub-background">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h2 className="text-start text-white">HUBBUB</h2>
        </a>

        <NavbarToggleButton isOpen={isOpen} handleClickOpen={handleClickOpen} />

        <div className={`${!isOpen && 'collapse'} navbar-collapse`} id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <a className="nav-link active fw-bold text-dark" aria-current="page" href="/items/feed">Rent Now</a>
            </li>
            {userId !== undefined &&
              <>
                <li className='nav-item'>
                  <a className="nav-link text-dark" href="/orders/history">My Rentals</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/cart">Cart</a>
                </li>
                <li className='nav-item'>
                  <a className="nav-link text-dark" onClick={handleLogout}>Logout</a>
                </li>
              </>
            }
            {userId === undefined &&
              <li className='nav-item'>
                <a className="nav-link text-dark" href="/login">Login</a>
              </li>
            }
            {userId === undefined &&
              <li className='nav-item'>
                <a className="nav-link text-dark" href="/register">Sign Up</a>
              </li>
            }
          </ul>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
