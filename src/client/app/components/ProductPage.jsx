import React from 'react';

import { PageHeader, Image, Col, Panel, Media, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import IPropTypes from 'immutable-props';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }


  handleAddToCart() {
    this.props.handleAddToCart(this.props.product, Number(this.props.quantity));
  }

  render() {
    const {
      product,
      quantity
    } = this.props;

    const PanelHeader = (
      <div className="text-uppercase">
        Price:

        <span className="pull-right">
          {`$${product.price}`}
        </span>
      </div>
    );

    const StockTooltip = (
      <Tooltip
        id="stock">
        {`Stock: ${product.stock}`}
      </Tooltip>
    );

    const PanelFooter = (
      <div>
        <OverlayTrigger
          placement="bottom"
          overlay={StockTooltip}>
          <InputGroup>
            <FormControl
              id="qtyInput"
              min="1"
              max={product.stock}
              type="number"
              value={quantity}
              onChange={this.props.handleUpdateQuantity} />
            <InputGroup.Addon>
              Units
            </InputGroup.Addon>
          </InputGroup>
        </OverlayTrigger>

        <div className="text-uppercase h4 product-page-total">
          Total:

          <span className="pull-right">
            {
              `$${
                Number(
                  quantity ?
                  product.price * quantity :
                    product.price
                ).toFixed(2)
              }`
            }
          </span>
        </div>

        <Button
          block
          bsStyle="primary"
          bsSize="large"
          onClick={this.handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    );

    return (
      <div>
        <Col sm={12}>
          <PageHeader>
            {product.name}
          </PageHeader>
          <Media className="product-page-brand">
            <Media.Left align="middle">
              <Image
                alt={product.brand_name}
                circle
                className="product-page-brand-logo"
                height="49"
                src={product.brand_logo} />
            </Media.Left>
            <Media.Body>
              <Media.Heading className="product-page-brand-name">{product.brand_name}</Media.Heading>
            </Media.Body>
          </Media>
        </Col>

        <Col sm={8}>
          <div className="product-page-img">
            <Image
              alt={product.name}
              className="img-responsive"
              src={product.picture}
              thumbnail />
          </div>
        </Col>

        <Col sm={4}>
          <Panel
            footer={PanelFooter}
            header={PanelHeader}>
            {product.description}
          </Panel>
        </Col>
      </div>
    );
  }
}

ProductPage.propTypes = {
  cart: IPropTypes.Map,
  product: React.PropTypes.object.isRequired,
  quantity: React.PropTypes.number.isRequired,
  handleAddToCart: React.PropTypes.func.isRequired,
  handleUpdateQuantity: React.PropTypes.func.isRequired
};

export default ProductPage;