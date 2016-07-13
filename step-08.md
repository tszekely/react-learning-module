---
layout: default
title: Step 8 - Working with Forms & Advanced Routing | React Learning Module
---

# Step 8 - Working with Forms & Advanced Routing

Although we've mostly covered everything in the last steps, this step provides you with a few ideas on working with forms and advanced routing using `react-router`. For this we'll create a Checkout feature & view for the store.

Let's start by downloading the [Country Names JSON here](http://country.io/names.json) and saving it as `src/client/app/Countries.json`.

Now in `Cart.jsx`, let's add a Checkout button at the bottom of the Cart list:

~~~jsx
    import { IndexLinkContainer } from 'react-router-bootstrap';

    // existing code
          <MenuItem divider />
          
          <IndexLinkContainer to={'/checkout'}>
            <MenuItem
              className="text-center h4 cart-checkout-button"
              disabled={this.props.cart.size < 1}>
              Go To Checkout
            </MenuItem>
          </IndexLinkContainer>
    ...
~~~
{: .language-jsx}

This also needs a bit of styling:

`main.less`

~~~less
.cart {
  min-width: 300px;
  max-width: 90vw;
  max-height: 450px;
  overflow-y: auto;

  &-checkout-button {
    padding: 0 @padding-base-horizontal 4px;
    margin: 0;

    a {
      .btn;
      .btn-lg;
      .btn-default;
      .btn-block;
    }
  }
}
~~~
{: .language-less}

Now let's create a Checkout route, where buyers can review their order and enter their address:

`Checkout.jsx`:

~~~jsx
import React from 'react';

import { ListGroup, ListGroupItem, Form, FormControl, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';

import CheckoutItem from './CheckoutItem.jsx';

import IPropTypes from 'immutable-props';

import { Map } from 'immutable';

import CountriesJSON from '../Countries.json';

const COUNTRIES = Map(CountriesJSON);

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        value: '',
        valid: false
      },
      lastName: {
        value: '',
        valid: false
      },
      email: {
        value: '',
        valid: false
      },
      phone: {
        value: '',
        valid: false
      },
      address: {
        value: '',
        valid: false
      },
      country: {
        value: '',
        valid: false
      },
      city: {
        value: '',
        valid: false
      },
      comments:  {
        value: '',
        valid: true
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  componentDidMount() {
    if (this.props.cart.size < 1) {
      this.context.router.push('/shop');
    }
  }

  handleInputChange(e) {
    let valid = this.state[e.target.id].valid,
      value = e.target.value;

    switch (e.target.id) {
      case 'firstName':
      case 'lastName':
      case 'city':
        if (/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-10]{1,20}$/.test(value)) {
          valid = true;
        } else {
          valid = false;
        }
        break;

      case 'email':
        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) {
          valid = true;
        } else {
          valid = false;
        }
        break;

      case 'phone':
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
          valid = true;
        } else {
          valid = false;
        }
        break;

      case 'address':
      case 'country':
        if (value.length > 0) {
          valid = true;
        } else {
          valid = false;
        }
        break;
    }

    this.setState({
      [e.target.id]: {
        value,
        valid
      }
    });
  }

  handleSubmitOrder() {
    this.context.router.push({
      pathname: 'order_sent',
      state: {
        fromCheckout: true
      }
    });
  }

  render() {
    let formIsValid = true;

    for (const field in this.state) {
      if (this.state.hasOwnProperty(field)) {
        formIsValid = formIsValid && this.state[field].valid;
      }
    }

    const total = this.props.cart.toArray().reduce(
      (acc, cartItem) => (Number(acc) + Number(cartItem.product.price) * Number(cartItem.quantity)),
      0
    ).toFixed(2);

    return (
      <Col sm={12}>
        <h1>Checkout</h1>
        
        <h2>Products</h2>
        <ListGroup>
          {
            this.props.cart.toArray().map(cartItem => (
              <CheckoutItem
                key={cartItem.product.id}
                cartItem={cartItem} />
            ))
          }

          <ListGroupItem>
            <h4>
              <span className="pull-right">
                ${total}
              </span>

              Total
            </h4>
          </ListGroupItem>
        </ListGroup>

        <h2>Shipping</h2>

        <Form>
          <Row>
            <Col sm={6}>
              <FormGroup validationState={this.state.firstName.valid ? 'success': 'error'}>
                <ControlLabel>
                  First name <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  type="text"
                  id="firstName"
                  required
                  value={this.state.firstName.value}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup validationState={this.state.lastName.valid ? 'success': 'error'}>
                <ControlLabel>
                  Last name <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  type="text"
                  id="lastName"
                  required
                  value={this.state.lastName.value}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup validationState={this.state.email.valid ? 'success': 'error'}>
                <ControlLabel>
                  E-mail <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  type="email"
                  id="email"
                  required
                  value={this.state.email.value}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup validationState={this.state.phone.valid ? 'success': 'error'}>
                <ControlLabel>
                  Phone <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  type="phone"
                  id="phone"
                  required
                  value={this.state.phone.value}
                  onChange={this.handleInputChange} />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup validationState={this.state.address.valid ? 'success': 'error'}>
                <ControlLabel>
                  Address <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  componentClass="textarea"
                  style={{ height: '108px' }}
                  id="address"
                  required
                  value={this.state.address.value}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup validationState={this.state.country.valid ? 'success': 'error'}>
                <ControlLabel>
                  Country <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  id="country"
                  required
                  value={this.state.country.value}
                  onChange={this.handleInputChange}>

                  <option
                    value=""
                    hidden>
                    Select a country
                  </option>

                  {
                    COUNTRIES.map((name, label) => (
                      <option
                        key={label}
                        value={label}>
                        {name}
                      </option>
                    )).toArray()
                  }

                </FormControl>
              </FormGroup>

              <FormGroup validationState={this.state.city.valid ? 'success': 'error'}>
                <ControlLabel>
                  City <span className="text-danger">*</span>
                </ControlLabel>
                <FormControl
                  type="text"
                  id="city"
                  required
                  value={this.state.city.value}
                  onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <ControlLabel>
              Comments
            </ControlLabel>
            <FormControl
              componentClass="textarea"
              type="text"
              id="comments"
              rows={4}
              value={this.state.comments.value}
              onChange={this.handleInputChange} />
          </FormGroup>

          <Row>
            <Col
              sm={6}
              smOffset={3}>
              <Button
                block
                bsSize="large"
                bsStyle="primary"
                disabled={!formIsValid}
                onClick={this.handleSubmitOrder}>
                Submit order
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

Checkout.propTypes = {
  cart: IPropTypes.Map
};

Checkout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Checkout;
~~~
{: .language-jsx}

And the `CheckoutItem.jsx`:

~~~jsx
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
~~~
{: .language-jsx}

Now let's analyze it:

- we create an `Immutable.Map` from the Countries JSON (which we use in the country select)
- we store each field's value in the **state** as it's mutable data, and their validation state
- in `componentDidMount` we check if the cart is empty, if it is, the user is redirected to the shop
- using the `handleInputChange` method, we handle change events on all the fields and we treat each one differently according to its id; we validate the value also and set the field's valid value accordingly. It's generally better to use a dedicated validation library, like [Parsley](http://parsleyjs.org/), but for the sake of simplicity here we used some regexes
- When the form is valid, the submit button is enabled; clicking it redirects us to the `order_sent` route, which is undefined yet, so let's also define it

`OrderSent.jsx`:

~~~jsx
import React from 'react';

class OrderSent extends React.Component {
  componentDidMount() {
    if (!this.props.location.state || !this.props.location.state.fromCheckout) {
      this.context.router.push({
        pathname: '',
        state: {
          fromCheckout: false
        }
      });
    }
  }

  componentWillUnmount() {
    this.context.router.push({
      state: {
        fromCheckout: false
      }
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1>The order was successfully placed!</h1>

        <p className="text-muted">Please wait forever for your order to arrive.</p>
      </div>
    );
  }
}

OrderSent.propTypes = {
  location: React.PropTypes.object.isRequired
};

OrderSent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default OrderSent;
~~~
{: .language-jsx}

This screen informs the user that the order was sent. But what if we visit it directly entering the URL?
Here comes the router state to save the day: we check if `fromCheckout` is defined and true in the state, if it's not, we redirect the user to home.

Now we just have to add these routes to `index.js`:

~~~jsx
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductPageWrapper from './components/ProductPageWrapper.jsx';
import NotFound from './components/NotFound.jsx';
import Checkout from './components/Checkout.jsx';
import OrderSent from './components/OrderSent.jsx';

render(
  (
    <Router
      history={browserHistory}>
      <Route
        path="/"
        component={App}>

        <IndexRoute
          component={Home} />

        <Route
          path="shop">

          <IndexRoute
            component={ProductList} />

          <Route
            path=":id"
            component={ProductPageWrapper} />

        </Route>

        <Route
          path="checkout"
          component={Checkout} />

        <Route
          path="order_sent"
          component={OrderSent} />

        <Route
          path="*"
          component={NotFound} />

      </Route>
    </Router>
  ), document.getElementById('app'));
~~~
{: .language-jsx}

And done, we have a working checkout!
