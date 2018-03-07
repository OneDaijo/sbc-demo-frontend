const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const development = process.env.NODE_ENV === 'development';

const config = {
  entry: path.join(__dirname, '..', 'src/index.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '..', 'demo'),
    publicPath: development ? '/' : '',
    libraryTarget: 'umd',
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css/, loaders: ['style-loader', 'css-loader'], exclude: /node_modules\/(?!rc-(?:slider|collapse))/ },
      { test: /\.(jpg|png|svg)/, loader: 'file-loader', exclude: /node_modules/, options: { publicPath: development ? '/' : '/demo/' } },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      title: 'OneDaijo SBC',
      template: 'index.html',
    }),
    new ExtractTextWebpackPlugin(path.join(__dirname, '..', 'global.css')),
  ],
};

if (!development) {
  const pathsToClean = ['dist', 'demo'];
  const cleanOpts = {
    root: path.join(__dirname, '..'),
  };

  config.plugins = config.plugins.concat([
    new CleanWebpackPlugin(pathsToClean, cleanOpts),
  ]);
}

if (development) {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, '..', 'src/index.js'),
  ];
  config.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: false,
  };

  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]);
}

module.exports = config;
