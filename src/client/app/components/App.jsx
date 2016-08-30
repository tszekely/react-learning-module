import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Grid } from 'react-bootstrap';

import Backendless from 'backendless';

import APP_CONSTANTS from '../constants/AppConstants';
const { BACKENDLESS } = APP_CONSTANTS;

Backendless.initApp(BACKENDLESS.APPLICATION_ID, BACKENDLESS.SECRET_KEY, BACKENDLESS.VERSION);
Backendless.enablePromises();

import CartStore from '../stores/CartStore';

function getStateFromStores() {
  return {
    cart: CartStore.getAll()
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    return (
      <html>
      <head>
        <meta charSet="utf-8" />

        <title>{this.props.title || 'Our Awesome Store'}</title>

        <link rel="icon"
          type="image/x-icon"
          href="/favicon.ico" />

        <link
          rel="shortcut icon"
          href="/favicon.ico" />

        <link
          href="/styles/style.css"
          rel="stylesheet" />
      </head>
      <body>
        <div id="app">
          <Header
            cart={this.state.cart} />
          <Grid id="content">
            {
              React.cloneElement(
                this.props.children,
                {
                  ...this.state
                }
              )
            }
          </Grid>
          <Footer />
        </div>

        <script
          type="text/javascript"
          src="/scripts/bundle.js">
        </script>
      </body>
      </html>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string
};

export default App;