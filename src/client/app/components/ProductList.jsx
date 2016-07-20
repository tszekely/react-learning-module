import React from 'react';
import Product from '../components/Product.jsx';
import ListPagination from './common/ListPagination.jsx';

import { Col, Clearfix } from 'react-bootstrap';
import Loading from './common/Loading.jsx';

import ProductActions from '../actions/view/ProductActions';
import ProductStore from '../stores/ProductStore';

import APP_CONSTANTS from '../constants/AppConstants';
const { PAGE_SIZE } = APP_CONSTANTS;

function getStateFromStores() {
  return {
    products: ProductStore.getAll(),
    activePage: ProductStore.getCurrentPage(),
    totalPages: ProductStore.getTotalPages(),
    isLoading: ProductStore.getLoadingState()
  };
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    this.handleSelectPage = this.handleSelectPage.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ProductActions.getProducts(this.state.activePage, PAGE_SIZE);
    ProductStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  handleSelectPage(newPage) {
    ProductActions.getProducts(newPage, PAGE_SIZE);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    const {
      activePage,
      products,
      totalPages,
      isLoading
    } = this.state;

    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div>
          <Col
            className="text-right"
            xs={12}>
            <ListPagination
              disabled={isLoading}
              activePage={activePage}
              items={totalPages}
              onSelect={this.handleSelectPage} />
          </Col>

          <Clearfix />

          {
            products.map(product => (
              <Product
                key={product.id}
                product={product} />
            ))
          }
        </div>
      );
    }
  }
}

export default ProductList;