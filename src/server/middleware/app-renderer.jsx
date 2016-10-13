import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { StyleSheetServer } from 'aphrodite'
import routes from '../../routes'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl-redux'
import ApolloClientSingleton from '../../network/apollo-client-singleton'
import React from 'react'
import renderIndex from './render-index'
import Store from '../../store'
import wrap from '../wrap'
import fs from 'fs'
import path from 'path'
import { localeData } from '../../locales/data.js'
require('dotenv').load({ path: '.env' })

export default wrap(async (req, res) => {
  const memoryHistory = createMemoryHistory(req.url)
  const store = new Store(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store.data)
  let assetMap = {
    'bundle.js': 'bundle.js'
  }

  if (process.env.NODE_ENV === 'production') {
    assetMap = JSON.parse(
       fs.readFileSync(
         path.join(process.env.ASSETS_DIR, process.env.ASSETS_MAP_FILE)
       )
     )
  }

  match({
    history,
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const language = req.query.language
      console.log('localeData', localeData)
      const messages = localeData[language]

      // update SSR of store based on url param...
      store.data.getState().intl = { locale: language, messages }
      const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
        <ApolloProvider store={store.data} client={ApolloClientSingleton}>
          <IntlProvider locale={language} messages={messages}>
            <RouterContext {...renderProps} />
          </IntlProvider>
        </ApolloProvider>
        )
      )

      res.send(renderIndex(html, css, assetMap, store.data, language, messages))
    } else {
      res.status(404).send('Not found')
    }
  })
})
