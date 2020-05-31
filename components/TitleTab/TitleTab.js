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
    <link
      rel='stylesheet'
      href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    />
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
