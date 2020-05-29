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
      href='https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'
      integrity='sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=='
      crossorigin=''
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
