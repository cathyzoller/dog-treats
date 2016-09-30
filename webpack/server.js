import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from './config'
import log from '../src/log'
require('dotenv').load({ path: '.env' });

const webpackPort = 3000
const appPort = process.env.DEV_APP_PORT

config.map(o => {
  Object.keys(o.entry).forEach((key) => {
    o.entry[key].unshift(`webpack-dev-server/client?http://localhost:${webpackPort}/`)
  });
});
const compiler = webpack(config);
const connstring = `http://localhost:${appPort}`

log.info(`Proxying requests to:${connstring}`)

const app = new WebpackDevServer(compiler, {
  contentBase: '/assets/',
  publicPath: '/assets/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '*': `http://localhost:${appPort}`
  },
  stats: { colors: true }
})

app.listen(webpackPort, () => {
  log.info(`Webpack dev server is now running on http://localhost:${webpackPort}`)
})
