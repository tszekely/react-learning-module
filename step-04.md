---
layout: default
title: Step 4 - Props & Creating the Product Components | React Learning Module
---

# Step 4 - Props & Creating the Product Components

**Props** (short for **properties**) are a Component's configuration, its options if you may. They are received from above and they're **immutable** as far as the Component receiving them is concerned.

A Component cannot change its props, but it is responsible for putting together the props of its child Components.

Simply put, it's just like **State** - an Object which stores the data we want to display, with the difference that the **Props** can NOT be changed inside the Component receiving them.

Let's see some examples.

## Creating the Shop view

Let's create the Product component first (`src/client/app/components/Product.jsx`):

~~~jsx
import React from 'react';

import { Col, Panel } from 'react-bootstrap';

function Product(props) {
  let {
    product
  } = props;

  return (
    <Col
      lg={3}
      md={4}
      sm={6}>
      <Panel className="product">
        <div className="product-img-wrapper">
          <a href="#">
            <img
              alt={product.name}
              className="img-responsive product-img"
              src={product.picture} />
          </a>
        </div>

        <h4
          className="ellipsis"
          title={product.name}>
          <a href="#">
            {product.name}
          </a>
        </h4>

        <h5
          className="ellipsis product-brand-name"
          title={product.brand_name}>
          {`by ${product.brand_name}`}
        </h5>

        <div className="pull-right h4 product-price">
          {`${product.price}$`}
        </div>
      </Panel>
    </Col>
  );
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired
};

export default Product;
~~~
{: .language-jsx}

and in `main.less`:

~~~less

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/****** Product ******/

.product {
  &-img-wrapper {
    margin: -15px -15px 0;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid @panel-default-border;
  }

  &-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-price {
    margin-bottom: 0;
  }
}
~~~
{: .language-less}

Now let's create a container component for the products (`src/client/app/components/ProductList.jsx`):

~~~jsx
import React from 'react';
import Product from '../components/Product.jsx';

class ProductList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.products.map(product => (
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

Now if we change the `App.jsx` file to

~~~jsx
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ProductList from '../components/ProductList.jsx';

import products from '../Products.json';

import { Grid } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products.slice(0, 12)
    };
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Header />
        <Grid id="content">
          <ProductList
            products={this.state.products} />
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
~~~
{: .language-jsx}

We can see a grid of 12 "products", looking similar to this:

[![Main store layout](http://puu.sh/pssaZ/7132ff2dc6.png){: .img-responsive}](http://puu.sh/pssaZ/7132ff2dc6.png)

Now let's study how the data flows in our app (the products array):

We are storing the products in the *App Component*'s **state**:

~~~jsx
    this.state = {
      products: products.slice(0, 12)
    };
~~~
{: .language-jsx}

Then we pass them through props to the *ProductList*:

~~~jsx
    <ProductList
        products={this.state.products} />
~~~
{: .language-jsx}

In the *ProductList*, we map the products coming from the **props** to *Product* components, passing each product object to its own component.

**Note: When rendering arrays of components like our products list, the key property is necessary for each component, and [it needs to be unique](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children).**

~~~jsx
    {
        this.props.products.map(product => (
            <Product
              key={product.id}
              product={product} />
        ))
    }
~~~
{: .language-jsx}

The in the *Product* component, we make broad use of the product **prop**, setting values to different fields there.

We can also set the PropTypes, and it's [recommended that we do so](http://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/):

Lastly, we can set defaultProps, which are default values in case some of our props are missing:

~~~jsx
ProductList.defaultProps = {
  products: []
};
~~~
{: .language-jsx}

In this case, it's very useful to have defaultProps, as failing to provide an array would throw 

~~~
ProductList.jsx:42 Uncaught TypeError: Cannot read property 'map' of undefined
~~~
