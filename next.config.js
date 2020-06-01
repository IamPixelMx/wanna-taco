const path = require('path');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const { withPlugins } = require('next-compose-plugins');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
require('dotenv').config();

const nextConfig = {
  /*
   * Workbox Options
   */
  workboxOpts: {
    clientsClaim: true,
    skipWaiting: true,
    swDest: path.join(__dirname, 'public/service-worker.js'),
  },

  /*
   * Webpack configuration
   */
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // Config rules
    const rules = [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], '@babel/react'],
          },
        },
      },
      //   {
      //     test: /\.css$/,
      //     use: [
      //       // style-loader
      //       { loader: 'style-loader' },
      //       // css-loader
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //         },
      //       },
      //     ],
      //   },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.README$/,
        use: 'null-loader',
      },
    ];

    rules.forEach(rule => {
      config.module.rules.push(rule);
    });

    // Build objectwith environment variables
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});
    /*
     * Allows you to create global constants which can be configured
     * at compile time, like our environment variables
     */
    config.plugins.push(new webpack.DefinePlugin(env));

    // Now let's build our manifest

    // const PUBLIC_PATH = '..';

    // config.plugins.push(
    //   new WebpackPwaManifest({
    //     filename: 'static/manifest.json',
    //     name: 'Melp',
    //     short_name: 'Melp',
    //     description: 'Web App to find your favorite places to eat',
    //     background_color: '#FFF',
    //     theme_color: '#B2CCFF',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     fingerprints: false,
    //     inject: false,
    //     start_url: '/',
    //     ios: {
    //       'apple-mobile-web-app-title': 'Melp',
    //       'apple-mobile-web-app-status-bar-style': '#B2CCFF',
    //     },
    //     icons: [
    //       {
    //         src: path.resolve('/logo.png'),
    //         sizes: [36, 48, 72, 96, 144, 192, 512],
    //         destination: '/static',
    //       },
    //       {
    //         src: path.resolve('/logo.png'),
    //         sizes: [120, 152, 167, 180, 1024],
    //         destination: '/static',
    //         ios: true,
    //       },
    //       {
    //         src: path.resolve('/logo.png'),
    //         size: 1024,
    //         destination: '/static',
    //         ios: 'startup',
    //       },
    //     ],
    //     includeDirectory: true,
    //     publicPath: PUBLIC_PATH,
    //   }),
    // );

    return config;
  },
};

module.exports = withPlugins([[withCSS], [withOffline]], nextConfig);
