import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

/**
 * TitleTab is used to modify the current browser tab title
 *
 * @param {String} title Browser tab title
 * @param {String} favico Favico path including filename and extension
 */
const TitleTab = ({ title, favico }) => (
  <Head>
    <title>{title}</title>
    <link rel='icon' favico={favico} />
  </Head>
);

TitleTab.defaultProps = {
  title: 'Melp',
  favico: '/favicon.ico',
};

TitleTab.propTypes = {
  title: PropTypes.string,
  favico: PropTypes.string,
};

export default TitleTab;
