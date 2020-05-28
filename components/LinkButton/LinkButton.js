import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkButton = ({ href, text, color }) => (
  <Link {...href}>
    <button className={'button is-medium is-rounded is-light' + ` ${color}`}>{text}</button>
  </Link>
);

LinkButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default LinkButton;
