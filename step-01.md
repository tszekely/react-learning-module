---
layout: default
title: Step 1 - Setting Up | React Learning Module
---

# Step 1 - Setting up

Throughout this guide, I will refer you to different guides and/or tutorials to avoid reinventing the wheel and re-writing something that's been written better than I would and I highly recommend not skipping these links, unless you're  confident you already know what they aim to teach.

**Reference:**

- [Setting Up a React.js Environment Using Npm, Babel 6 and Webpack](https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack)

## Create a new node package
The very first step is obviously creating a new project folder (I've named it *react-learning-module*, you can call yours whatever you want). 

The next step is creating a new node package, by opening a terminal window in that folder and running:
```
npm init
```

You will be asked a few things about the package you're making, you can just press *enter* to set the default values for each of them or set them to your liking. For example, these are my settings:

```
name: (react-learning-module)
version: (1.0.0) 0.0.1
description: A simplified e-commerce app to support the React Learning Module.
entry point: (index.js)
test command:
git repository: (https://github.com/tszekely/react-learning-module.git)
keywords: react, tutorial, guide, learning, module, es6, webpack, hmr, javascript, flux, redux
author: Timotheus Szekely
license: (ISC) MIT
```

After that you'll be asked if your settings are OK. Type `yes` and press *enter*. That's it!

## Installing and Configuring Webpack

Now we're going to install [Webpack](http://webpack.github.io/) via **npm** by running the following command In the same terminal window:
```
npm i webpack --save-dev
```

The `--save-dev` argument saves the package in your ``package.json``'s *devDependencies*. Very helpful if you plan to install your project on more than one machine (and you will, eventually).

Now it's time to configure it. Create a `webpack.config.js` file and, with your code editor of choice, update it with:

```
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
```

Let's create the index.jsx file in the ./src/client/app and add the following code to verify this configuration.
```
console.log('Hello World!');
```

Now in the terminal run the following command (according to your OS):

```
// linux / mac
./node_modules/.bin/webpack -d

// windows
node_modules\.bin\webpack -d
```
The above command runs the webpack in the development mode and generates the `bundle.js` file and its associated map file `bundle.js.map` in the `src/client/public` directory.

To make it more interactive, create an `index.html` file in the `src/client` directory and modify it to use this `bundle.js` file

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React.js using NPM, Babel6 and Webpack</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="public/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

**Note: There is a webpack loader called [html-loader](https://github.com/webpack/html-loader) which automatically creates this html file with the correct location of `bundle.js`.**

## Setting Up Babel-Loader

To setup, install the following npm packages:
```
npm i babel-loader babel-preset-es2015 babel-preset-react --save-dev
```

The *babel-preset-es2015* and *babel-preset-react* are plugins being used by the *babel-loader* to translate ES6 and JSX syntax respectively.

As we did for Webpack, babel-loader also requires some configuration. Here we need to tell it to use the ES6 and JSX plugins.

Create a `.babelrc` file and update it as below:

```
{
  "presets" : ["es2015", "react"]
}
```

The next step is telling Webpack to use the babel-loader while bundling the files.

Open webpack.config.js file and update it as below:

```
// Existing Code ....
var config = {
  // Existing Code ....
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
}
```

## Setting up React

Using **npm**, install React and ReactDOM:
```
npm i react react-dom -S
```

Replace the existing console.log statement in the index.jsx with the following content:

```
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (<p> Hello React!</p>);
  }
}

render(<App />, document.getElementById('app'));
```

Then run:

```
// linux / mac
./node_modules/.bin/webpack -d

// windows
node_modules\.bin\webpack -d
```

Now, if you open the index.html in the browser, you can see "Hello React".