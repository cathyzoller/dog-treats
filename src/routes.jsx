import { Route, IndexRedirect } from 'react-router'
import DogtreatsContainer from './containers/DogtreatsContainer'
import App from './components/App'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/dog-treats?language=en' />
    <Route path='dog-treats' component={DogtreatsContainer} />
  </Route>
)
