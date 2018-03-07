const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(md|yml.encrypted|sh|vm)$/)
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.json$/,
      use: [{
        loader: 'json-loader'
      }]
    },
    {
      test: /\.yml$/,
      use: [{
        loader: 'yml'
      }]
    }
    ]
  }
};
