import React from 'react';

import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              Our Awesome Store
            </a>
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

            <NavItem
              eventKey={3}>
              <Glyphicon glyph="shopping-cart" />
              {' Cart'}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;