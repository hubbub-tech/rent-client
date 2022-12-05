import { useState, useEffect } from 'react';

export const NavbarLink = ({ className, to, children, onClick = undefined }) => {

  return (
    <li className='nav-item'>
    {onClick
      ? <a className={className} aria-current="page" onClick={onClick}>{ children }</a>
      : <a className={className} aria-current="page" href={to}>{ children }</a>
    }
    </li>
  );
}
