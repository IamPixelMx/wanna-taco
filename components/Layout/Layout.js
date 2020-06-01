import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Loader, Navbar } from 'components';

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setIsLoading(true);
    };
    Router.onRouteChangeComplete = () => {
      setIsLoading(false);
    };
    Router.onRouteChangeError = () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <main id='main' className='has-navbar-fixed-top section'>
      <Navbar activeRoute={router.pathname} />
      {isLoading ? <Loader {...isLoading} /> : children}
      <style jsx global>
        {`
          .padding-top {
            padding-top: 6.5rem;
          }

          .leaflet-container {
            height: 40rem;
            margin: 2rem;
          }
        `}
      </style>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
