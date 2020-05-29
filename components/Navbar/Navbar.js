import React, { useState } from 'react';
import Link from 'next/link';

import { NavbarItem } from './';

const NAV_ITEMS = [
  { page: 'Inicio', route: '/' },
  { page: 'Mapa', route: '/home' },
  { page: 'Oriental', route: '/home' },
  { page: 'Postres', route: '/home' },
  { page: 'Vegetariana', route: '/home' },
  { page: 'Cafecito', route: '/home' },
];

const Navbar = props => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const toggleDrop = () => {
    setIsDropOpen(!isDropOpen);
  };

  return (
    <nav className='navbar is-fixed-top'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link href='/'>
            <figure className='image is-128x128'>
              <img src='/logo.png' alt='logo' />
            </figure>
          </Link>
          <span
            className={isNavOpen ? 'navbar-burger is-active' : 'navbar-burger'}
            data-target='navbarMenuHeroB'
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={isNavOpen ? 'navbar-menu is-active' : 'navbar-menu'} id='navbarMenuHeroB'>
          <div className={isNavOpen ? 'navbar-end is-active' : 'navbar-end'}>
            <NavbarItem {...NAV_ITEMS[0]} {...props} />
            <NavbarItem {...NAV_ITEMS[1]} {...props} />
            <div
              className={
                isDropOpen
                  ? 'navbar-item has-dropdown is-active'
                  : 'navbar-item has-dropdown is-active'
              }
              onClick={toggleDrop}
            >
              <hr className='navbar-divider' />
              <a className='navbar-link'>Comida</a>
              <div className='navbar-dropdown is-right'>
                <NavbarItem {...NAV_ITEMS[2]} {...props} />
                <NavbarItem {...NAV_ITEMS[3]} {...props} />
                <NavbarItem {...NAV_ITEMS[4]} {...props} />
                <NavbarItem {...NAV_ITEMS[5]} {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
