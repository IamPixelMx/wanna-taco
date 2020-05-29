import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCategorie } from '../../redux/selectors';
import { SET_ACTIVE_CATEGORIE } from '../../redux/constants';

import { NavbarItem } from './';
import { CATEGORIES_ITEMS } from 'utils';

const NAV_ITEMS = [
  { page: 'Inicio', route: '/' },
  { page: 'Mapa', route: '/home' },
];

const Navbar = ({ activeRoute }) => {
  const dispatch = useDispatch();
  const activeCategorie = useSelector(getActiveCategorie);

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
            {NAV_ITEMS.map(props => (
              <NavbarItem key={`${props.page}-nav-link`} activeRoute={activeRoute} {...props} />
            ))}
            <div
              className={
                isDropOpen ? 'navbar-item has-dropdown is-active' : 'navbar-item has-dropdown'
              }
              onClick={toggleDrop}
            >
              <hr className='navbar-divider' />
              <a className='navbar-link'>Comida</a>
              <div className='navbar-dropdown is-right'>
                {CATEGORIES_ITEMS.map(({ categorie, label }) => (
                  <a
                    key={`${categorie}-drop`}
                    className={
                      activeCategorie === categorie ? 'navbar-item is-active' : 'navbar-item'
                    }
                    onClick={() => dispatch({ type: SET_ACTIVE_CATEGORIE, payload: categorie })}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
