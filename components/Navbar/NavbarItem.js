import PropTypes from 'prop-types';
import Link from 'next/link';

const NavbarItem = ({ route, page, activeRoute }) => (
  <Link href={route}>
    <a
      className={
        route === activeRoute ? 'navbar-item is-nice-blue is-active' : 'navbar-item is-nice-blue'
      }
    >
      {page}
    </a>
  </Link>
);

NavbarItem.propTypes = {
  activeRoute: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavbarItem;
