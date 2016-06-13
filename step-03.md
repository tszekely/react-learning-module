---
layout: default
title: Step 3 - State | React Learning Module
---

# Step 3 - State

## Preparing our data

> State is the place where the data comes from. You should always try to make your state as simple as possible and minimize number of stateful components. If you have, for example, ten components that need data from the state, you should create one container component that will keep the state for all of them.
-- [Tutorialspoint](http://www.tutorialspoint.com/reactjs/reactjs_state.htm)

In our case, the main thing we'll have in our state is the Products list.

To build the Products list, I'm using [Mockaroo](https://www.mockaroo.com/84946030) to generate dummy data.

To get your own dataset, just visit the link and click Download data (name it `Products.json` and place it in `src/client/app`), or get the [Products.json]() file from the repo.

## Loading the data from the JSON

In order to import JSON files, we need to install the json-loader:

~~~
npm install --save-dev json-loader
~~~

and add it to our `webpack.config.js` file (and also exclude .json files from eslint as we don't want 2000 warnings about double quotes and so on):

~~~javascript
loaders : [
      // existing code
      {
        test: /\.jsx?/,
        loader: "eslint",
        exclude: [/node_modules/, /\.json/]
      },
      // existing code
      {
        test: /\.json/,
        loader: 'json',
        include: APP_DIR
      }
    ]
~~~
{: .language-javascript}

Now let's import the products from the JSON file, set the initial state and log it in the render method :

~~~jsx
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import products from '../Products.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products
    };
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Header />
        <div id="content">
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
~~~
{: .language-jsx}

When the app is run, you should see something like this printed:

~~~javascript
Object {products: Array[200]}
~~~
{: .language-javascript}

That is **state** for you. A simple JavaScript Object you can store your data in.

Note: In case you're wondering, `{ products }` is a [shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals) for `{ products: products }`.

Now let's create some more Components.

