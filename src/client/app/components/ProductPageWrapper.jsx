import React from 'react';

import ProductPage from './ProductPage.jsx';
import NotFound from './NotFound.jsx';

import IPropTypes from 'immutable-props';

class ProductPageWrapper extends React.Component {


  render() {
    const product = this.props.products.find((p) => {
      return p.id === this.props.params.id;
    });

    return product ? (
      <ProductPage
        cart={this.props.cart}
        product={product}
        handleAddToCart={this.props.handleAddToCart} />
    ) : (
      <NotFound />
    );
  }
}

ProductPageWrapper.propTypes = {
  cart: IPropTypes.Map,
  products: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.object.isRequired,
  handleAddToCart: React.PropTypes.func
};

export default ProductPageWrapper;