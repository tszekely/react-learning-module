import React from 'react'; // eslint-disable-line
// import { render } from 'react-dom';
import ReactEngineClient from 'react-engine/lib/client';

import Routes from './routes.jsx';

const options = {
  routes: Routes,

  viewResolver(viewName) {
    return require('./components/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  // boot the app when the DOM is ready
  ReactEngineClient.boot(options);
});
