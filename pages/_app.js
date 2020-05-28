import React from 'react';
import 'regenerator-runtime/runtime.js';

import { Provider } from 'react-redux';
import App from 'next/app';
// Redux modules
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
// Configfuration for redux store
import configureStore from 'redux/configureStore';
// Bulma CSS
import 'bulma/css/bulma.min.css';
// Tab Titles
import { TITLES as titles } from 'utils';
import { Footer, TitleTab } from 'components';

class MelpApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }
  render() {
    const { Component, pageProps, router, store } = this.props;

    return (
      <Provider store={store}>
        <TitleTab title={titles[router.pathname]} />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(MelpApp));
