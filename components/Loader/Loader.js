import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return (
    <div className={isLoading ? 'pageloader is-active' : 'pageloader'}>
      <span className='title'>Cargando...</span>
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;
