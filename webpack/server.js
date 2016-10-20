import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from './config'
import log from '../src/log'
require('dotenv').load({ path: '.env' })

const webpackPort = 3030
const appPort = process.env.DEV_APP_PORT

Object.keys(config.entry).forEach((key) => {
  config.entry[key].unshift(`webpack-dev-server/client?http://localhost:${webpackPort}/`)
});
const compiler = webpack(config)
const connstring = `http://localhost:${appPort}`

console.log(`Proxying requests to:${connstring}`)

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
  console.log(`Webpack dev server is now running on http://localhost:${webpackPort}`)
})
