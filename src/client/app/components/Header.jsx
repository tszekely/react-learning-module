import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';

import IPropTypes from 'immutable-props';

import Cart from './Cart.jsx';

class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
                Our Awesome Store
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <IndexLinkContainer to="/">
              <NavItem
                eventKey={1}>
                Home
              </NavItem>
            </IndexLinkContainer>

            <IndexLinkContainer to="/shop">
              <NavItem
                eventKey={2}>
                Shop
              </NavItem>
            </IndexLinkContainer>
            
            <Cart
              cart={this.props.cart} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  cart: IPropTypes.Map
};

export default Header;