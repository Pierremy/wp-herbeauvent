const merge = require('webpack-merge');
const generateCommonConfiguration = require('./webpack.common.js');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(generateCommonConfiguration(false), {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'http://localhost/herbeauvent/',
      notify: false,
      open: true
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        './js/*',
        './css/*',
      ]
    })
  ]
});