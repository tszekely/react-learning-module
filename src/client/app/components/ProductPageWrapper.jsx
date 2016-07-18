import React from 'react';

import ProductPage from './ProductPage.jsx';
import NotFound from './NotFound.jsx';

import IPropTypes from 'immutable-props';

import ProductActions from '../actions/view/ProductActions';
import ProductStore from '../stores/ProductStore';
import CartActions from '../actions/view/CartActions';

import Loading from './common/Loading.jsx';

function getStateFromStores(props) {
  return {
    product: ProductStore.getOneById(props.params.id),
    isLoading: ProductStore.getLoadingState()
  };
}

class ProductPageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromStores(props),
      quantity: 1
    };

    this._onChange = this._onChange.bind(this);

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
  }

  componentDidMount() {
    if (!this.state.product) {
      ProductActions.getProductById(this.props.params.id);
    }

    ProductStore.addChangeListener(this._onChange);
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      if (ProductStore.getOneById(nextProps.params.id)) {
        this.setState(getStateFromStores(nextProps));
      } else {
        ProductActions.getProductById(nextProps.params.id);
      }
    }
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  handleAddToCart(product, quantity) {
    CartActions.addProductToCart(product, quantity);
  }

  handleUpdateQuantity(e) {
    this.setState({
      quantity: Number(e.target.value)
    });
  }

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

  render() {
    const {
      product,
      isLoading
    } = this.state;

    if (isLoading) {
      return (<Loading />);
    } else {
      return product ? (
        <ProductPage
          cart={this.props.cart}
          product={product}
          quantity={this.state.quantity}
          handleAddToCart={this.handleAddToCart}
          handleUpdateQuantity={this.handleUpdateQuantity} />
      ) : (
        <NotFound />
      );
    }
  }
}

ProductPageWrapper.propTypes = {
  cart: IPropTypes.Map,
  products: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.object.isRequired,
  handleAddToCart: React.PropTypes.func
};

export default ProductPageWrapper;