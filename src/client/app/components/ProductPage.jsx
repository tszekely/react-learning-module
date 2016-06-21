import React from 'react';
import { findDOMNode } from 'react-dom';

import { PageHeader, Image, Col, Panel, Media, InputGroup, FormControl, Button } from 'react-bootstrap';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   quantity
    // }
  }

  componentWillMount() {
    console.log('Component WILL MOUNT!');

    const qtyInput = document.getElementById('qtyInput');
    console.log(qtyInput);
  }

  componentDidMount() {
    console.log('Component DID MOUNT!');

    const qtyInput = findDOMNode(this.qtyInput);

    qtyInput.onchange = (e) => {
      this.quantity = e.target.value;
      this.forceUpdate();
    };
  }

  componentWillReceiveProps(/*newProps*/) {
    console.log('Component WILL RECIEVE PROPS!');
  }

  shouldComponentUpdate(/*newProps, newState*/) {
    return true;
  }

  componentWillUpdate(/*nextProps, nextState*/) {
    console.log('Component WILL UPDATE!');
  }

  componentDidUpdate(/*prevProps, prevState*/) {
    console.log('Component DID UPDATE!');
  }

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!');
  }

  // handleUpdateQuantity(e) {
  //   console.log(e);
  // }

  render() {
    const { product } = this.props;

    const PanelHeader = (
      <div className="text-uppercase">
        Price:

        <span className="pull-right">
          {`${product.price}$`}
        </span>
      </div>
    );

    const PanelFooter = (
      <div>
        <InputGroup>
          <FormControl
            id="qtyInput"
            min="1"
            max="99"
            type="number"
            defaultValue={1}
            ref={(ref) => { this.qtyInput = ref; }} />
          <InputGroup.Addon>
            Units
          </InputGroup.Addon>
        </InputGroup>

        <div className="text-uppercase h4 product-page-total">
          Total:

          <span className="pull-right">
            {
              `${
                Number(
                  this.quantity ?
                  product.price * this.quantity :
                    product.price
                ).toFixed(2)
              } $`
            }
          </span>
        </div>

        <Button
          block
          bsStyle="primary"
          bsSize="large">
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
  product: React.PropTypes.object.isRequired
};

export default ProductPage;