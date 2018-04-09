import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'

import App from "./mainLayout/App";

// Pages
import PageHome from './pages/PageHome'
import PageLogin from './pages/PageLogin'
import PageProfile from './pages/PageProfile'
import PageDeliver from './pages/pageDeliver';
import PageRequest from './pages/pageRequest';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={PageHome}/>
      <Route path="deliver" component={PageDeliver}/>
      <Route path="profile" component={PageProfile}/>
      <Route path="request" component={PageRequest}/>
      <Route path="login" component={PageLogin}/>
    </Route>
  </Router>
), document.getElementById('root'))
