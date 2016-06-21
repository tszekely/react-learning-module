---
layout: default
title: Step 5 - Refs, Component API & Lifecycle | React Learning Module
---

# Step 5 - Refs, Component API & Lifecycle

**References:**

- [Component Specs and Lifecycle](https://facebook.github.io/react/docs/component-specs.html)
- [Understanding the React Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)
- [Refs to Components](https://facebook.github.io/react/docs/more-about-refs.html)

## Component API

In the last steps we learned components have **state** and **props**. Now we're going to study how the Components *react* (pun intended) to their changes.

Back to our app, we are displaying 12 of the 200 products we generated. We could display all 200, but that could take a long time to load and it would be quite hard to keep track of them when browsing. What if we could do something awesome like... pagination?

We can and we will.

### The `setState` method
 
Let's start with creating a new component (`src/client/app/components/common/ListPagination.jsx`):

~~~jsx
import React from 'react';

import { Pagination } from 'react-bootstrap';

function ListPagination(props) {
  return (
    <Pagination
      activePage={props.activePage}
      first
      items={props.items}
      last
      maxButtons={5}
      next
      onSelect={props.onSelect}
      prev />
  );
}

ListPagination.propTypes = {
  activePage: React.PropTypes.number.isRequired,
  items: React.PropTypes.number.isRequired,
  onSelect: React.PropTypes.func.isRequired
};

ListPagination.defaultProps = {
  activePage: 1,
  items: 1,
  onSelect: () => {}
};

export default ListPagination;
~~~
{: .language-jsx}

Again, we're using the Pagination Component from **react-bootstrap**, which saves us a lot of time (imagine creating a component which dynamically renders a number of buttons, setting the 'active' class to a specified button number, limiting the number of buttons to display, etc. Not extremely hard but non-trivial and totally beyond the purpose of this tutorial).

What our Component does is it just sets some default parameters for the react-bootstrap Pagination Component.

Now let's set the App state's products back to our full list (`App.jsx`):

~~~jsx
...
    this.state = {
      products
    };
...
~~~
{: .language-jsx}

Now let's do a small change to our `.eslintrc` so it won't bug us for using `setState` (as it's a valid use-case here) or non-alphabetically sorted props:

~~~json
    ...
    "react/jsx-sort-props": 0,
    ...
    "react/no-set-state": 0,
    ...
    "react/sort-prop-types": 0,
    ...
~~~
{: .language-json}

then change the `ProductList.jsx` file to:

~~~jsx
import React from 'react';
import Product from '../components/Product.jsx';
import ListPagination from './common/ListPagination.jsx';

import { Col, Clearfix } from 'react-bootstrap';

const PAGE_SIZE = 24;

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1
    };

    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  handleSelectPage(newPage) {
    this.setState({
      activePage: newPage
    });
  }

  render() {
    const {
      activePage
    } = this.state;

    const products = this.props.products.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);

    return (
      <div>
        <Col
          className="text-right"
          xs={12}>
          <ListPagination
            activePage={activePage}
            items={Math.ceil(this.props.products.length / PAGE_SIZE)}
            onSelect={this.handleSelectPage} />
        </Col>

        <Clearfix />

        {
          products.map(product => (
            <Product
              key={product.id}
              product={product} />
          ))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;
~~~
{: .language-jsx}

Let's analyse our changes:
1. We imported the `ListPagination` Component
2. We imported the `Clearfix` Component from react-bootstrap
3. We set a PAGE_SIZE constant to 24
4. We set our initial state to { activePage: 1 } so that the first page displayed is the first page
5. We created a `handleSelectPage` method which makes use of `setState` to update the `activePage` to the one we pass it, and we bound `this` to it in the `constructor` (`React.createClass()` does this automatically, we'll discuss it later when handling events)
6. We created a `products` array which is a slice of **PAGE_SIZE** (24) products from our main array; this is the products list we display
7. We passed the activePage, pages number (all products' length / PAGE_SIZE) and the `handleSelectPage` method as props to the `ListPagination` Component

Now when we click on the pagination buttons, the `handleSelectPage` method is called with the page number as argument, which updates our list and pagination Component as expected. Cool, isn't it?

### Refs & the `ReactDOM.findDOMNode` method

> React supports a special attribute that you can attach to any component. The ref attribute can be a callback function, and this callback will be executed immediately after the component is mounted. The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).
-- [React Docs](https://facebook.github.io/react/docs/more-about-refs.html)

To demonstrate how `forceUpdate` works, we're going to do something wrong (we'll fix it later). Let's create a `ProductPage` Component and replace the `ProductList` with it:

`src/client/app/components/ProductPage.jsx`

~~~jsx
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
    console.log(qtyInput);

    qtyInput.onchange = (e) => {
      this.quantity = e.target.value;
      console.log(this.quantity);

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
~~~
{: .language-jsx}

then in `App.jsx`:

~~~jsx
import ProductPage from '../components/ProductPage.jsx';

...
    <Grid id="content">
      <ProductPage
        product={this.state.products[0]} />
    </Grid>
...
~~~
{: .language-jsx}

and in `main.less`: 

~~~less
/****** Product Page ******/

.product-page {
  &-brand {
    margin-bottom: @form-group-margin-bottom * 2;
  }

  &-brand-logo {
    border: 1px solid @panel-default-border;
  }

  &-brand-name {
    margin: @form-group-margin-bottom 0;
  }
}
~~~
{: .language-less}

Now let's analyse our new Component:

1. We added some components to display our product's information, pictures, description, etc. Nothing too fancy about those.
2. We display a total price which is basically `product_price * quantity`
3. We added a **number input** with **react-bootstrap**'s `FormControl` and we attached a **ref** to it
4. We used the **ref** to get the underlying DOM node using the `findDOMNOde` method (as our FormControl is not a DOM node, the ref returns a React Component instance; if it was a regular DOM node, the ref would point to the DOM node itself)
5. We attached a change event handler to the DOM node

Now if we change the input's value and take a look at the console we notice the value of the input is printed out... but the component is not updated (the total price stays the same). 
That is because React Components update when **props** or **state** change, but we attached the quantity value to the component as a property (just like we did with the **ref**, actually). We could have attached it to a regular variable and we'd had the same result.

To make the component update in this case, we have to call `forceUpdate`. This method triggers a update, bypassing the `shouldComponentUpdate` method. Add it to the change handler (and remove the console.log with this occasion):

~~~jsx
...
    qtyInput.onchange = (e) => {
      this.quantity = e.target.value;
      this.forceUpdate();
    };
...
~~~
{: .language-jsx}

Now the component updates as we expect. But, again, this is the wrong way to do it. We'll fix it in the next step but for now let's take a look at the **Component Lifecycle**.

## Component Lifecycle methods

I won't go in details with the lifecycle methods, as they're explained perfectly [here](http://busypeoples.github.io/post/react-component-lifecycle/). 

For the sake of demonstration, we've added them to our component too. Some we used (componentDidMount), some we just listed with `console.log`s.

We will likely use them later in this tutorial.


