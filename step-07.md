---
layout: default
title: Step 7 - Handling events in React | React Learning Module
---

# Handling events in React

**References:**


- [React Event System](https://facebook.github.io/react/docs/events.html)
- [6 Ways to Bind JavaScript’s this Keyword in React, ES6 & ES7](https://www.sitepoint.com/bind-javascripts-this-keyword-react/)

## Preparations

For a full list of supported events and more details, refer to the [React Official documentation](https://facebook.github.io/react/docs/events.html).

Unrelated to events, but let's enable the Object Rest Spread transforms for babel:

~~~
npm install babel-plugin-transform-object-rest-spread
~~~

and add the following line to `.babelrc`:

~~~json
  "plugins": ["transform-object-rest-spread"]
~~~
{: .language-json}

Let's also install [ImmutableJS](https://facebook.github.io/immutable-js/docs/#/) and the related PropTypes validations:

~~~
npm install --save immutable immutable-props
~~~

## Handling the Change events on the Product Page with React

The way we handled the change event in [Step 5](http://tszekely.github.io/react-learning-module/step-05) is not quite correct, as we're not doing it the React way, so we'll begin with fixing that.

Let's change the `ProductPage` as follows:

~~~jsx
import React from 'react';

import { PageHeader, Image, Col, Panel, Media, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
  }
  
  handleUpdateQuantity(e) {
    this.setState({
        quantity: Number(e.target.value)
    });
  }
  
  render() {
    const { product } = this.props;

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
              value={this.state.quantity}
              onChange={this.handleUpdateQuantity} />
            <InputGroup.Addon>
              Units
            </InputGroup.Addon>
          </InputGroup>
        </OverlayTrigger>
        
    // unchanged
~~~
{: .language-jsx}

Let's examine our changes:

- We set the initial `state` with a quantity of 1, and we've set the input value to `this.state.quantity`
- We created the `handleUpdateQuantity` method which sets the `quantity` in the `state` to the **target element's value**
- We bound the `handleUpdateQuantity` method to the Component's `this`, because React components written as ES2015 Classes don't automatically bind methods to the component instance
- We've removed the `ref` attribute of the `input`, and added the `onChange` attribute; React event handlers are similar to [HTML Event Attributes](http://www.w3schools.com/tags/ref_eventattributes.asp) but their names are *camelCased*; we bound `this.handleUpdateQuantity` to the input's `onChange` event
- We added a tooltip to the quantity input, which contains the stock for the product
- We set the maximum value of the quantity input to the stock of the product; normally you'd want to also check the value in the cart and calculate the maximum quantity available, but it's not necessary for us at the moment

## Creating a Cart Component

For the Cart, we'll create a simple dropdown showing basic info about the products we added. For the cart, we'll use an [Immutable.Map](https://facebook.github.io/immutable-js/docs/#/Map).

Let's start by adding the `cart` in the App state:

`App.jsx`:

~~~jsx
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import products from '../Products.json';

import { Grid } from 'react-bootstrap';

import { Map } from 'immutable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products,
      cart: Map()
    };

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(product, quantity) {
    let newCart = this.state.cart.update(product.id, (p) => {
      return p ?
      {
        ...p,
        quantity: p.quantity + quantity
      } :
      {
        product,
        quantity: quantity
      };
    });
    
    this.setState({
      cart: newCart
    });
  }

  render() {
    return (
      <div>
        <Header
          cart={this.state.cart} />
        <Grid id="content">
          {
            React.cloneElement(
              this.props.children,
              {
                handleAddToCart: this.handleAddToCart,
                ...this.state
              }
            )
          }
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
~~~
{: .language-jsx}

The `Immutable.Map` ensures that mutations don't occur on the original state object, which could prevent React from re-rendering the view (and cause some nasty issues that are hard to fix), but rather a new `Immutable.Map` is created for each update and the new value is returned.

In the `handleAddToCart` method, we're taking the desired **product** and the **quantity** we want to add, and if the product already exists, we add the quantity to the existing one, else we add the product to the cart, with the `product.id` as key.

We're passing this method to the App Component's children as we need to call it from the Product page.

The `ProductPageWrapper` becomes:

~~~jsx
import React from 'react';

import ProductPage from './ProductPage.jsx';
import NotFound from './NotFound.jsx';

import IPropTypes from 'immutable-props';

class ProductPageWrapper extends React.Component {


  render() {
    const product = this.props.products.find((p) => {
      return p.id === this.props.params.id;
    });

    return product ? (
      <ProductPage
        cart={this.props.cart}
        product={product}
        handleAddToCart={this.props.handleAddToCart} />
    ) : (
      <NotFound />
    );
  }
}

ProductPageWrapper.propTypes = {
  cart: IPropTypes.Map,
  products: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.object.isRequired,
  handleAddToCart: React.PropTypes.func
};

export default ProductPageWrapper;
~~~
{: language-jsx}

Notice that we're using `immutable-proptypes` for the cart, as React doesn't provide PropTypes for ImmutableJS data structures.

Now in the `ProductPage.jsx`, we just have to add a `handleAddToCart` method to call the one from props and bind it to the click event on the **Add to cart** button:

~~~jsx
...

import IPropTypes from 'immutable-props';

class ProductPage extends React.Component {
  constructor(props) {
    //existing code
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
  }
  
  ...
  
  handleAddToCart() {
    this.props.handleAddToCart(this.props.product, Number(this.state.quantity));
  }
  ...
  
  render() {
    ...
    <Button
      block
      bsStyle="primary"
      bsSize="large"
      onClick={this.handleAddToCart}>
      Add to Cart
    </Button>
    ...
  }
  
  ...

}

ProductPage.propTypes = {
  cart: IPropTypes.Map,
  product: React.PropTypes.object.isRequired,
  handleAddToCart: React.PropTypes.func.isRequired
};

export default ProductPage;
~~~
{: .language-jsx}

Now if you `console.log` the cart, adding products to it should immediately log the new cart value updated.

Let's create the actual **Cart** component:

`Cart.jsx`:

~~~jsx
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
~~~
{: .language-jsx}

It's nothing too exotic: a dropdown showing a list of `CartItems` and a total price.

Let's also define the `CartItem`s:

`CartItem.jsx`:

~~~jsx
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
~~~
{: .language-jsx}

Again, a basic `MenuItem`, displaying the product picture, quantity and total price for the product (quantity * product.price) which links to the product's page when clicked.

Last, update the header to include the **Cart** component:

`Header.jsx`:

~~~jsx
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
~~~
{: .language-jsx}

As a final touch, let's make sure the cart looks good no matter how many products are in it:

In `main.less`:

~~~less

/****** Cart ******/

.cart {
  min-width: 300px;
  max-width: 90vw;
  max-height: 450px;
  overflow-y: auto;
}
~~~
{: .language-less}
