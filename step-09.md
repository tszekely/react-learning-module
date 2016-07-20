---
layout: default
title: Step 8 - Flux Architecture | React Learning Module
---

# Flux Architecture

Before diving in the last part of this tutorial, the **Flux Architecture**, I strongly advise you to read and try to understand the following:

- [Flux Official Docs](http://facebook.github.io/flux/docs)
- [Flux For Stupid People](http://blog.andrewray.me/flux-for-stupid-people/)
- [Async requests with React.js and Flux, revisited](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/)

For this last step, I tried to keep things as realistic as possible, so I've also introduced an API to get the products.

Since the API comes from [Backendless](https://backendless.com/) Let's start with installing their JS SDK, and of course Flux:

~~~
npm i --save backendless flux
~~~

We'll start with getting the Product list from the server.

If you look at this diagram, it makes perfect sense if you know Flux, but for someone who doesn't, it's usually just more confusion.

![Flux Flow](https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png)
{: .img-responsive}

The idea is that the data flow is **unidirectional**, which makes it easier to reason about and debug.

I'll try to explain everything refering to the diagram above.

In our case, we want to load the product list as soon as the shop view is mounted.

Let's start with creading a file to hold our constants:

`src/client/app/constants/AppConstants.js`

~~~javascript
import keyMirror from 'fbjs/lib/keyMirror';

const APP_CONSTANTS = {
  ACTION_SOURCES: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  }),

  BACKENDLESS: {
    APPLICATION_ID: '3D108505-7C5D-6740-FFF2-348F8D69EC00',
    SECRET_KEY: '48697205-51A9-520B-FFDD-E81D6467DE00',
    VERSION: 'v1'
  },

  ACTION_TYPES: {
    PRODUCTS: keyMirror({
      GET_PRODUCTS: null,
      PRODUCTS_LOADED: null,
      GET_PRODUCT_BY_ID: null,
      PRODUCT_LOADED: null,
      PRODUCT_LOAD_FAILED: null
    }),

    CART: keyMirror({
      ADD_PRODUCT_TO_CART: null,
      EMPTY_CART: null
    })
  },

  PAGE_SIZE: 24
};

export default APP_CONSTANTS;
~~~
{: .language-javascript}

The Backendless constants are only needed here because the [Backendless API needs them](https://backendless.com/mobile-developers/quick-start-guide-for-javascript/). I'll explain the rest of them when we'll use them.

Because we're using the `Backendless SDK`, we need to initialize it and we'll do it in the `App` Component, as it's the first thing that loads in our app, so let's add the following at the top of our `App.jsx` file:

~~~
import Backendless from 'backendless';

import APP_CONSTANTS from '../constants/AppConstants';
const { BACKENDLESS } = APP_CONSTANTS;

Backendless.initApp(BACKENDLESS.APPLICATION_ID, BACKENDLESS.SECRET_KEY, BACKENDLESS.VERSION);
Backendless.enablePromises();
~~~

You should also remove the `Products.json` import as it'll be no longer required.

## The Dispatcher

> The Dispatcher is a singleton, and operates as the central hub of data flow in a Flux application. It is essentially a registry of callbacks, and can invoke these callbacks in order. Each store registers a callback with the dispatcher. When new data comes into the dispatcher, it then uses these callbacks to propagate that data to all of the stores. The process of invoking the callbacks is initiated through the dispatch() method, which takes a data payload object as its sole argument. This payload is typically synonymous with an action.
-- [Flux Official Docs](https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#content)

Let's write ours:

`src/client/app/dispatcher/AppDispatcher.js`:

~~~javascript
import { Dispatcher } from 'flux';

import APP_CONSTANTS from '../constants/AppConstants';

const AppDispatcher = Object.assign(
  new Dispatcher(),
  {
    handleViewAction(action) {
      console.info(APP_CONSTANTS.ACTION_SOURCES.VIEW_ACTION, action);

      this.dispatch({
        source: APP_CONSTANTS.ACTION_SOURCES.VIEW_ACTION,
        action
      });
    },

    handleServerAction(action) {
      console.info(APP_CONSTANTS.ACTION_SOURCES.SERVER_ACTION, action);

      this.dispatch({
        source: APP_CONSTANTS.ACTION_SOURCES.SERVER_ACTION,
        action
      });
    }
  }
);

export default AppDispatcher;
~~~
{: .language-javascript}

## Actions

Actions are simple JS Objects, defining *what should happen* (the **action type**) and the data needed for that event (ex.: a list of products for the `PRODUCTS_LOADED` action type).

We split our actions in 2 categories, based on the `ACTION_SOURCE`: `VIEW_ACTION` (triggered by the User/View) and `SERVER_ACTION` (triggered by API calls, when they're completed).

## Action Creators

The next step for us is to define our **Action Creators**. **Action creators** are simple functions which dispatch specific actions with a predefined data model.

Let's define the Product view action creators:

`src/client/actions/view/ProductActions.js`:

~~~javascript
import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import ProductAPI from '../../utils/ProductAPI';
import AppDispatcher from '../../dispatcher/AppDispatcher';

const ProductActions = {
  getProducts(page, pageSize) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.PRODUCTS.GET_PRODUCTS,
      data: {
        page,
        pageSize
      }
    });

    return ProductAPI.getProducts(page, pageSize);
  },

  getProductById(productId) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.PRODUCTS.GET_PRODUCT_BY_ID,
      data: {
        productId
      }
    });

    return ProductAPI.getProductById(productId);
  }
};

export default ProductActions;
~~~
{: .language-javascript}

As you've probably noticed, these Action Creators also call the API methods (which we haven't defined yet). There are 2 possible methods of making API calls with Flux:

- having the stores make the calls and handling data with callbacks
- having the view action creators make the calls and communicating the response to the stores through server actions (our approach)

You can find out the reasons why the second approach is better in the last [reference link](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/).

Let's also create our **Product server actions**

`src/client/app/actions/server/ProductActions.js`:

~~~javascript
import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import AppDispatcher from '../../dispatcher/AppDispatcher';

const ProductActions = {
  productsLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCTS_LOADED,
      data
    });
  },

  productLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCT_LOADED,
      data
    });
  },

  productLoadFailed() {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCT_LOAD_FAILED
    });
  }
};

export default ProductActions;
~~~
{: .language-javascript}

## API Utils

Now let's create an **API Utils** file. This file will handle all our **Product-related API calls**. It's good practice to have separate files for each entity, especially when the app you're building is large. For small apps a single **API utils** file will do. That being said, let's create the **Product API Utils**:

`src/client/app/utils/ProductAPI.js`:

~~~javascript
import Backendless from 'backendless';

import ProductActions from '../actions/server/ProductActions';

const ProductStorage = Backendless.Persistence.of('Products');


const ProductAPI = {
  getProducts(page = 0, pageSize = 24) {
    return ProductStorage.find({
      options: {
        pageSize: pageSize,
        offset: (page - 1) * pageSize
      }
    }).then((response) => {
      ProductActions.productsLoaded(response);
    });
  },

  getProductById(productId) {
    return ProductStorage.findById(productId).then((response) => {
      response.id = productId;
      ProductActions.productLoaded(response);
    }).catch((/*error*/) => {
      ProductActions.productLoadFailed();
    });
  }
};

export default ProductAPI;
~~~
{: .language-javascript}

The API Util methods simply make some requests wrapped in promises and emit certain **actions** on success (the `ProductStorage.find/findById` calls can be easily replaced with XHR / jQuery.ajax / superagent / whatever; I personally recommend promise-based libraries / calls wrapped in promises).

Now if we add 


~~~jsx
...
  componentDidMount() {
    ProductActions.getProducts(this.state.activePage, PAGE_SIZE);
    ProductStore.addChangeListener(this._onChange);
  }
...
~~~
{: .language-jsx}

to the `ProductList.jsx` and take a look at the console, we'll see that a **view action** is triggered, and after the request is done a **server action** is triggered, containing the response (a list of products and some more data from the server).

That's great, but what do we do with the data, where do we store it?

*...enter THE STORE*

## Stores

**Stores** play the role of caching the data and responding to actions. When it comes to *application state*, Stores should be the single source of truth for our data (component-related state, like if an element is collapsed or not should reside in the component's state, not stores).

Let's write the **Product Store**:

~~~javascript
let _products = [],
  _currentPage = 1,
  _totalPages = 1,
  _isLoading = true;

import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';

import APP_CONSTANTS from '../constants/AppConstants';
const { ACTION_TYPES, PAGE_SIZE } = APP_CONSTANTS;

const CHANGE_EVENT = 'CHANGE';

function _loadProductData(data) {
  _products = data.data.map(product => ({ ...product, id: product.objectId }));
  _currentPage = data.offset / PAGE_SIZE + 1;
  _totalPages = Math.ceil(data.totalObjects / PAGE_SIZE);
  _isLoading = false;
}

const ProductStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return _products;
  },

  getOneById(productId) {
    return _products.find((p) => p.id === productId);
  },

  getCurrentPage() {
    return _currentPage;
  },

  getTotalPages() {
    return _totalPages;
  },

  getLoadingState() {
    return _isLoading;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

ProductStore.dispatcherIndex = AppDispatcher.register((payload) => {
  const { action } = payload;

  switch (action.actionType) {
    case ACTION_TYPES.PRODUCTS.GET_PRODUCTS:
    case ACTION_TYPES.PRODUCTS.GET_PRODUCT_BY_ID:
      _isLoading = true;
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCTS_LOADED:
      _loadProductData(action.data);
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCT_LOADED:
      _products.push(action.data);
      _isLoading = false;
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCT_LOAD_FAILED:
      _isLoading = false;
      ProductStore.emitChange();
      break; 

  }
});

export default ProductStore;;
~~~
{: .language-javascript}

- the store data is private (`_products, _currentPage, _totalPages = 1, _isLoading`), but accessible through getters
- the data is only changed as a response to **actions**
- the store emits a `change` event every time the data is updated
- the store allows binding callbacks to the change event (and of course destroying the bindings)

## React Views

Now that we've built the data flow, it's time to use the data in our views.

Because we'll actually have loading times now, let's make a simple loading screen:

`src/client/app/components/common/Loading.jsx`:

~~~jsx
import React from 'react';

function Loading() {
  return(
    <div id="loading">
      <div className="loader">Loading...</div>
    </div>
  );
}

export default Loading;
~~~
{: .language-jsx}

And the styles for it

`main.less`:

~~~less
/****** Loader ******/

#loading {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
}

.loader {
  align-self: center;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0,0,0, 0.2);
  border-right: 1.1em solid rgba(0,0,0, 0.2);
  border-bottom: 1.1em solid rgba(0,0,0, 0.2);
  border-left: 1.1em solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.pagination.disabled {
  > li > a {
    color: #777777;
    background-color: #fff;
    border-color: #ddd;
    cursor: not-allowed;
    pointer-events: none;
  }
}
~~~
{: .language-less}

Now let's change the `ProductList` to:

~~~jsx
import React from 'react';
import Product from '../components/Product.jsx';
import ListPagination from './common/ListPagination.jsx';

import { Col, Clearfix } from 'react-bootstrap';
import Loading from './common/Loading.jsx';

import ProductActions from '../actions/view/ProductActions';
import ProductStore from '../stores/ProductStore';

import APP_CONSTANTS from '../constants/AppConstants';
const { PAGE_SIZE } = APP_CONSTANTS;

function getStateFromStores() {
  return {
    products: ProductStore.getAll(),
    activePage: ProductStore.getCurrentPage(),
    totalPages: ProductStore.getTotalPages(),
    isLoading: ProductStore.getLoadingState()
  };
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    this.handleSelectPage = this.handleSelectPage.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ProductActions.getProducts(this.state.activePage, PAGE_SIZE);
    ProductStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  handleSelectPage(newPage) {
    ProductActions.getProducts(newPage, PAGE_SIZE);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    const {
      activePage,
      products,
      totalPages,
      isLoading
    } = this.state;

    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div>
          <Col
            className="text-right"
            xs={12}>
            <ListPagination
              disabled={isLoading}
              activePage={activePage}
              items={totalPages}
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
}

export default ProductList;
~~~
{: .language-jsx}

- the state is initialized with the initial values from the Store, using the `getStateFromStores` function; this function maps the Store values to the state
- the `_onChange` method has the simple role of updating the state with data from the stores
- when the components mounts, we call the `getProducts` action to get our initial product data and we bind the `_onChange` method to the `ProductStore`'s `change` event; everytime the store changes, the state is updated immediately
- when the component unmounts, we remove the `change` listener, so we don't get memory leaks and unnecessary updates to unmounted components (this can also introduce hard to track errors and the *setState called on an unmounted component* warning)
- when changing the page, a new request is made to get the products for the next page
- if the `ProductStore` is loading, we display the loading screen, else we display the products

Now if you open the shop page, you should see a loading screen and then the products as expected.

Of course, the product page will also require some drastic changes.

Let's start with the `ProductPage.jsx`:

~~~jsx
import React from 'react';

import { PageHeader, Image, Col, Panel, Media, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import IPropTypes from 'immutable-props';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }


  handleAddToCart() {
    this.props.handleAddToCart(this.props.product, Number(this.props.quantity));
  }

  render() {
    const {
      product,
      quantity
    } = this.props;

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
              value={quantity}
              onChange={this.props.handleUpdateQuantity} />
            <InputGroup.Addon>
              Units
            </InputGroup.Addon>
          </InputGroup>
        </OverlayTrigger>

        <div className="text-uppercase h4 product-page-total">
          Total:

          <span className="pull-right">
            {
              `$${
                Number(
                  quantity ?
                  product.price * quantity :
                    product.price
                ).toFixed(2)
              }`
            }
          </span>
        </div>

        <Button
          block
          bsStyle="primary"
          bsSize="large"
          onClick={this.handleAddToCart}>
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
  cart: IPropTypes.Map,
  product: React.PropTypes.object.isRequired,
  quantity: React.PropTypes.number.isRequired,
  handleAddToCart: React.PropTypes.func.isRequired,
  handleUpdateQuantity: React.PropTypes.func.isRequired
};

export default ProductPage;
~~~
{: .language-jsx}

We're moving all the state to the `ProductPageWrapper`, leaving the `ProductPage` pure.

Now in the `ProductPageWrapper.jsx`:

~~~jsx
import React from 'react';

import ProductPage from './ProductPage.jsx';
import NotFound from './NotFound.jsx';

import IPropTypes from 'immutable-props';

import ProductActions from '../actions/view/ProductActions';
import ProductStore from '../stores/ProductStore';
import CartActions from '../actions/view/CartActions';

import Loading from './common/Loading.jsx';

function getStateFromStores(props) {
  return {
    product: ProductStore.getOneById(props.params.id),
    isLoading: ProductStore.getLoadingState()
  };
}

class ProductPageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromStores(props),
      quantity: 1
    };

    this._onChange = this._onChange.bind(this);

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
  }

  componentDidMount() {
    if (!this.state.product) {
      ProductActions.getProductById(this.props.params.id);
    }

    ProductStore.addChangeListener(this._onChange);
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      if (ProductStore.getOneById(nextProps.params.id)) {
        this.setState(getStateFromStores(nextProps));
      } else {
        ProductActions.getProductById(nextProps.params.id);
      }
    }
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  handleAddToCart(product, quantity) {
    CartActions.addProductToCart(product, quantity);
  }

  handleUpdateQuantity(e) {
    this.setState({
      quantity: Number(e.target.value)
    });
  }

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

  render() {
    const {
      product,
      isLoading
    } = this.state;

    if (isLoading) {
      return (<Loading />);
    } else {
      return product ? (
        <ProductPage
          cart={this.props.cart}
          product={product}
          quantity={this.state.quantity}
          handleAddToCart={this.handleAddToCart}
          handleUpdateQuantity={this.handleUpdateQuantity} />
      ) : (
        <NotFound />
      );
    }
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
{: .language-jsx}

- we're using the same flow as in the `ProductList` with `getStateFromStores`, `addChangeListener`, `removeChangeListener` to connect to the Store
- on mount, if the product is not already in the Store (i.e. loaded by the Product List), retrieve it from the API
- on update, if the next product to be displayed is in the store, just load it, otherwise retrieve it from the API
- handle the quantity here
- call `CartActions.addProductToCart(product, quantity)` when adding to cart

... but `CartActions` is not defined, so let's do that:

`src/client/app/actions/view/CartActions.js`:

~~~javascript
import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import AppDispatcher from '../../dispatcher/AppDispatcher';

const CartActions = {
  addProductToCart(product, quantity) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.CART.ADD_PRODUCT_TO_CART,
      data: {
        product,
        quantity
      }
    });
  }
};

export default CartActions;
~~~
{: .language-javascript}

And we'll move the Cart logic to the Store

`src/client/app/stores/CartStore.js`:

~~~javascript
import { Map } from 'immutable';

let _cartItems = Map(),
  _isLoading = true;

import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';

import APP_CONSTANTS from '../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

const CHANGE_EVENT = 'CHANGE';

function addProductToCart(product, quantity) {
  _cartItems = _cartItems.update(product.id, (p) => {
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
}

const CartStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return _cartItems;
  },

  getLoadingState() {
    return _isLoading;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CartStore.dispatcherIndex = AppDispatcher.register((payload) => {
  const { action } = payload;

  switch (action.actionType) {
    case ACTION_TYPES.CART.ADD_PRODUCT_TO_CART:
      addProductToCart(action.data.product, action.data.quantity);
      CartStore.emitChange();
      break;
  }
});

export default CartStore;
~~~
{: .language-javascript}

`App.jsx` becomes:

~~~jsx
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Grid } from 'react-bootstrap';

import Backendless from 'backendless';

import APP_CONSTANTS from '../constants/AppConstants';
const { BACKENDLESS } = APP_CONSTANTS;

Backendless.initApp(BACKENDLESS.APPLICATION_ID, BACKENDLESS.SECRET_KEY, BACKENDLESS.VERSION);
Backendless.enablePromises();

import CartStore from '../stores/CartStore';

function getStateFromStores() {
  return {
    cart: CartStore.getAll()
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
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

And that's it. Sure, we still aren't sending any orders but that's a quite complex logic to implement and it defeats the purpose of this tutorial, so we'll stop here. If you feel eager to, do it yourself as an exercise ;)

