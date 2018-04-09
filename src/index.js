import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'

import App from "./mainLayout/App";

// Pages
import PageHome from './pages/PageHome'
import PageLogin from './pages/PageLogin'
import PageProfile from './pages/PageProfile'
import PageDeliver from './pages/pageDeliver';
import AppDeliver from './mainLayout/AppDeliver';
import AppLogin from './mainLayout/AppLogin';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={PageHome}/>
    </Route>
    <Route path="/" component={AppDeliver} >
      <Route path="entregar" component={PageDeliver}/>
    </Route>
    <Route path="/" component={AppLogin} >
      <Route path="login" component={PageLogin}/>
      <Route path="profile" component={PageProfile}/>
    </Route>
  </Router>
), document.getElementById('root'))
