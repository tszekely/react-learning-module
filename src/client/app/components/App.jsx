import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import products from '../Products.json';

import { Grid } from 'react-bootstrap';

import { Map } from 'immutable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products,
      cart: Map()
    };

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(product, quantity) {
    let newCart = this.state.cart.update(product.id, (p) => {
      return p ?
      {
        ...p,
        quantity: p.quantity + quantity
      } :
      {
        product,
        quantity: quantity
      };
    });
    
    this.setState({
      cart: newCart
    });
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
                handleAddToCart: this.handleAddToCart,
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