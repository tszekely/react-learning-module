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
      <div>
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
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;