import React from 'react';

import { Col, Panel } from 'react-bootstrap';

import { Link } from 'react-router';

function Product(props) {
  let {
    product
  } = props;

  return (
    <Col
      lg={3}
      md={4}
      sm={6}>
      <Panel className="product">
        <div className="product-img-wrapper">
          <Link to={`shop/${product.id}`}>
            <img
              alt={product.name}
              className="img-responsive product-img"
              src={product.picture} />
          </Link>
        </div>

        <h4
          className="ellipsis"
          title={product.name}>
          <Link to={`shop/${product.id}`}>
            {product.name}
          </Link>
        </h4>

        <h5
          className="ellipsis product-brand-name"
          title={product.brand_name}>
          {`by ${product.brand_name}`}
        </h5>

        <div className="pull-right h4 product-price">
          {`${product.price}$`}
        </div>
      </Panel>
    </Col>
  );
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired
};

export default Product;