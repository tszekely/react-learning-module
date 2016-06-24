import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductPageWrapper from './components/ProductPageWrapper.jsx';
import NotFound from './components/NotFound.jsx';

render(
  (
    <Router
      history={browserHistory}>
      <Route
        path="/"
        component={App}>

        <IndexRoute
          component={Home} />

        <Route
          path="shop">

          <IndexRoute
            component={ProductList} />

          <Route
            path=":id"
            component={ProductPageWrapper} />

        </Route>

        <Route
          path="*"
          component={NotFound} />

      </Route>
    </Router>
  ), document.getElementById('app'));