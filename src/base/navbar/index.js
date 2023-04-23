import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { NavbarLink } from './NavbarLink';
import { NavbarToggleButton } from './NavbarToggleButton';

import { SessionContext } from '../../providers/SessionProvider';
import { ItemSearchInput } from '../../inputs/item-search';


export const Index = () => {
  const navigate = useNavigate();

  const { userId, sessionToken } = useContext(SessionContext);

  const [isOpen, setIsOpen] = useState(false);

  const defaultNavClassName = 'collapse navbar-collapse';
  const [navClassName, setNavClassName] = useState(defaultNavClassName);

  useEffect(() => {
    isOpen
      ? setNavClassName('navbar-collapse')
      : setNavClassName(defaultNavClassName);
  }, [isOpen]);

  const handleClickOpen = () => setIsOpen(!isOpen);

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

        {/*

        
          <NavbarToggleButton isOpen={isOpen} handleClickOpen={handleClickOpen} />

          <div className={navClassName} id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavbarLink className="nav-link active fw-bold text-dark" to="/items/feed">Rent Now</NavbarLink>
              {(userId && sessionToken)
                ? <>
                    <NavbarLink className="nav-link text-dark" to="/rentals">My Rentals</NavbarLink>
                    <NavbarLink className="nav-link text-dark" to="/cart">Cart</NavbarLink>
                    <NavbarLink className="nav-link text-dark" onClick={handleLogout}>Logout</NavbarLink>
                  </>
                : <>
                    <NavbarLink className="nav-link text-dark" to="/login">Login</NavbarLink>
                    <NavbarLink className="nav-link text-dark" to="/register">Sign Up</NavbarLink>
                  </>
              }
            </ul>
            <ItemSearchInput />
          </div>
        */}
      </div>
    </nav>
  );
}
