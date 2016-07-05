import React from 'react';

import { MenuItem, Media, Image } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

function CartItem(props) {
  const {
    product,
    quantity
  } = props.cartItem;

  return (
    <IndexLinkContainer  to={`shop/${product.id}`}>
      <MenuItem
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
      </MenuItem>
    </IndexLinkContainer>
  );
}

CartItem.propTypes = {
  cartItem: React.PropTypes.object.isRequired
};

export default CartItem;