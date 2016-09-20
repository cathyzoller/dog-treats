import { Route, IndexRedirect } from 'react-router'
import LocalCounter from './containers/LocalCounter'
import RemoteCounter from './containers/RemoteCounter'
import DogtreatsContainer from './containers/DogtreatsContainer'
import App from './components/App'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/dog-treats' />
    <Route path='local-counter' component={LocalCounter} />
    <Route path='remote-counter' component={RemoteCounter} />
    <Route path='dog-treats' component={DogtreatsContainer} />
  </Route>
)
