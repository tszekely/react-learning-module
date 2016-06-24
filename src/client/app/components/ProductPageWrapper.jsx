import React from 'react';

import ProductPage from './ProductPage.jsx';
import NotFound from './NotFound.jsx';

class ProductPageWrapper extends React.Component {


  render() {
    const product = this.props.products.find((p) => {
      return p.id === this.props.params.id;
    });

    return product ? (
      <ProductPage
        product={product} />
    ) : (
      <NotFound />
    );
  }
}

ProductPageWrapper.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.object.isRequired
};

export default ProductPageWrapper;