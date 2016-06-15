import React from 'react';

import { Col, Panel } from 'react-bootstrap';

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
          <a href="#">
            <img
              alt={product.name}
              className="img-responsive product-img"
              src={product.picture} />
          </a>
        </div>

        <h4
          className="ellipsis"
          title={product.name}>
          <a href="#">
            {product.name}
          </a>
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