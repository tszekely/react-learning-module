import React from 'react';

import { Dropdown, Nav, NavItem, Glyphicon, MenuItem } from 'react-bootstrap';

import IPropTypes from 'immutable-props';

import CartItem from './CartItem.jsx';

class Cart extends React.Component {

  render() {
    const total = this.props.cart.toArray().reduce(
      (acc, cartItem) => (Number(acc) + Number(cartItem.product.price) * Number(cartItem.quantity)),
      0
    ).toFixed(2);

    return (
      <Dropdown id="cartDropdown">
        <Nav
          bsRole="toggle"
          pullRight>
          <NavItem
            eventKey={3}>
            <Glyphicon glyph="shopping-cart" />
            {' Cart '}
            <Glyphicon glyph="caret-down" />
          </NavItem>
        </Nav>

        <ul
          bsRole="menu"
          className="dropdown-menu cart">
          {
            this.props.cart.size > 0 ?
              this.props.cart.toArray().map(cartItem => (
                <CartItem
                  key={cartItem.product.id}
                  cartItem={cartItem} />
              )) :
              (
                <MenuItem disabled>
                  No products in the cart
                </MenuItem>
              )
          }

          <MenuItem divider />
          <MenuItem disabled>
            <h4>
              Total:

              <span className="pull-right">{`$${total}`}</span>
            </h4>
          </MenuItem>
        </ul>
      </Dropdown>
    );
  }
}

Cart.propTypes = {
  cart: IPropTypes.Map
};

export default Cart;