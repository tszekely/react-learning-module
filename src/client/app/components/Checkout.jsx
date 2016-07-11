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
    console.log(e);

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