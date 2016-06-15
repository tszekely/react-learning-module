import React from 'react';
import Product from '../components/Product.jsx';

class ProductList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.products.map(product => (
            <Product
              key={product.id}
              product={product} />
          ))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;