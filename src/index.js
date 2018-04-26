import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'

import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router-dom'

//layout. There are all pages
import App from "./mainLayout/App";

// Redux
import { authReducers } from "./reducers"

const history = createHistory()

const allReducers = {
  routerReducer,
  authReducers,
}

const store = createStore(
  combineReducers(allReducers),
  applyMiddleware(routerMiddleware(history)),
)

// On close event
// window.onbeforeunload = confirmExit;
// function confirmExit() {
//   return "You have attempted to leave this page. Are you sure?";
// }

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))
