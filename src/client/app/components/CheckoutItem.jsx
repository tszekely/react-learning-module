import React from 'react';

import { ListGroupItem, Media, Image } from 'react-bootstrap';

function CheckoutItem(props) {
  const {
    product,
    quantity
  } = props.cartItem;

  return (
    <ListGroupItem
      className="cart-item">
      <Media>
        <Media.Left>
          <Image
            src={product.picture}
            width="64" />
        </Media.Left>

        <Media.Body>
          <Media.Heading>{product.name}</Media.Heading>

          <h5 className="pull-right">{`$${Number(quantity * product.price).toFixed(2)}`}</h5>
          <h5 className="pull-left">{`${quantity} Units`}</h5>
        </Media.Body>
      </Media>
    </ListGroupItem>
  );
}

CheckoutItem.propTypes = {
  cartItem: React.PropTypes.object.isRequired
};

export default CheckoutItem;