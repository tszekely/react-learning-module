import React from 'react'; // eslint-disable-line
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductPageWrapper from './components/ProductPageWrapper.jsx';
import NotFound from './components/NotFound.jsx';
import Checkout from './components/Checkout.jsx';
import OrderSent from './components/OrderSent.jsx';

export default (
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
        path="checkout"
        component={Checkout} />

      <Route
        path="order_sent"
        component={OrderSent} />

      <Route
        path="*"
        component={NotFound} />

    </Route>
  </Router>
);
