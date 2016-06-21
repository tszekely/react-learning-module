import React from 'react';
import Product from '../components/Product.jsx';
import ListPagination from './common/ListPagination.jsx';

import { Col, Clearfix } from 'react-bootstrap';

const PAGE_SIZE = 24;

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1
    };

    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  handleSelectPage(newPage) {
    this.setState({
      activePage: newPage
    });
  }

  render() {
    const {
      activePage
    } = this.state;

    const products = this.props.products.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);

    return (
      <div>
        <Col
          className="text-right"
          xs={12}>
          <ListPagination
            activePage={activePage}
            items={Math.ceil(this.props.products.length / PAGE_SIZE)}
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

ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;