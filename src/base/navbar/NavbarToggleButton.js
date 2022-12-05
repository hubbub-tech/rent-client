import hamburgerSvg from '../assets/hamburger.svg';

export const NavbarToggleButton = ({ isOpen, handleClickOpen }) => {
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
      <img src={hamburgerSvg} alt="menu-icon" />
    </button>
  );
}
