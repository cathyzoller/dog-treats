const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

require('babel-polyfill');
require('dotenv').load({ path: '.env' })

const DEBUG = process.env.NODE_ENV !== 'production'

const PATHS = {
  app: path.join(__dirname, '../', 'src'),
  build: path.join(__dirname, '../', process.env.ASSETS_DIR)
};
const plugins = [];

const assetsDir = process.env.ASSETS_DIR
const assetMapFile = process.env.ASSETS_MAP_FILE
const outputFile = DEBUG ? '[name].js' : '[name].[chunkhash].js'

if (!DEBUG) {
  plugins.push(new ManifestPlugin({
    fileName: assetMapFile
  }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }))
}

const config = {
  name: 'bundle',
  entry: {
    bundle: ['babel-polyfill', path.join(__dirname, '../', 'src', 'index.jsx')]
  },
  module: {
    noParse: [
      //eg  /\/libphonenumber\.js$/ (pre-built & minified js files)
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: DEBUG
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: PATHS.app
  },
  plugins,
  output: {
    filename: outputFile,
    path: PATHS.build,
    publicPath: '/assets'
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // show stats in the console
  progress: true
};

if (DEBUG) {
  config.devtool = '#inline-source-map'
} else if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map'
}

module.exports = config
