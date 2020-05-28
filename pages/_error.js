import Router from 'next/router';
import regeneratorRuntime from 'regenerator-runtime';

import PropTypes from 'prop-types';

const ErrorPage = ({ statusCode }) => (
  <ErrorStyled>
    <img alt='error-img' src={`/__mocks__/errors/${statusCode}.jpg`} />
    <button className='button is-danger is-medium is-rounded' onClick={() => Router.push('/')}>
      Ir a página de inicio
    </button>
  </ErrorStyled>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

ErrorPage.defaultProps = {
  statusCode: 404,
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
};

export default ErrorPage;
