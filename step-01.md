---
layout: default
title: Step 1 - Setting Up | React Learning Module
---

# Step 1 - Setting up

Throughout this guide, I will refer you to different guides and/or tutorials to avoid reinventing the wheel and re-writing something that's been written better than I would and I highly recommend not skipping these links, unless you're  confident you already know what they aim to teach.

**References:**

- [Setting Up a React.js Environment Using Npm, Babel 6 and Webpack](https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack)
- [Writing Happy Stylesheets with Webpack](http://jamesknelson.com/writing-happy-stylesheets-with-webpack/)
- [Optimizing React + ES6 + Webpack Production Build](http://moduscreate.com/optimizing-react-es6-webpack-production-build/)
- [ESLint config for React + Redux projects](http://glenn-roberts.com/2015/11/19/eslint-config-for-react--redux-projects.html)
- [Lint Like It’s 2015](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48#.wpxli7h8k)

**Note: This is a mixed version of the tutorials above, with less explanations. For more info about Webpack or npm, refer to their documentations and/or Google it.**

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

{: .language-javascript}
```
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
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

Let's create the `index.jsx` file in the `./src/client/app` and add the following code to verify this configuration.

{: .language-javascript}
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

To make it more interactive, create an `index.html` file in the root directory and modify it to use this `bundle.js` file

{: .language-html}
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React.js using NPM, Babel6 and Webpack</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="src/client/public/bundle.js" type="text/javascript"></script>
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

{: .language-json}
```
{
  "presets" : ["es2015", "react"]
}
```

The next step is telling Webpack to use the babel-loader while bundling the files.

Open webpack.config.js file and update it as below:

{: .language-json}
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
npm i react react-dom --save
```

Replace the existing console.log statement in the index.jsx with the following content:

{: .language-jsx}
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

## Making Webpack Watch Changes

Running the webpack command every time when you change the file is not a productive workflow. We can easily change this behavior by using the following command:

```
// linux / mac
./node_modules/.bin/webpack -d --watch

// windows
node_modules\.bin\webpack -d --watch
```

## Enabling Hot Module Reloading

To make sure we don't need to refresh the page everytime we make changes, we'll also install [react-hot-loader](http://gaearon.github.io/react-hot-loader/getstarted/), [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) and
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

Install them as follows:
```
npm i --save-dev webpack-dev-server react-hot-loader html-webpack-plugin
```

Update the `webpack.config.js` file as follows:

{: .language-javascript}
```
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    APP_DIR + '/index.jsx' // Your appʼs entry point
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loaders : [
          'react-hot', // Here we enable Hot-Module-Reloading for React Components
          'babel'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: __dirname + '/index.html'
    })
  ]
};

module.exports = config;
```

Remove the `<script src="src/client/public/bundle.js" type="text/javascript"></script>` line in `index.html` as it's no longer necessary (**HtmlWebpackPlugin** automatically appends the bundled script to our HTML file).

Now, the last thing we need to do for now is to update the `package.json` file:

{: .language-json}
```
// existing code
"scripts": {
    "start": "webpack-dev-server --config webpack.config.js",
    "build": "webpack -p",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// existing code
```

This allows us to run the **WebpackDevServer** for development with **Hot Module Reloading** enabled by typing `npm start` in the terminal, and to create a production build by running `npm run build`.

Try running the dev server (`npm start`) and navigating to http://localhost:8080 . If everything is OK, you should see the "Hello React!" message.

If you open the console in your browser, you should see something like

```
[HMR] Waiting for update signal from WDS...
```

This means our Hot Module Reloading works. Neat!

Try editing the `index.jsx` message and saving the file. The page automatically reloads and displays our latest changes, without needing to refresh the page manually.

## Handling Styles and static files (assets)

Using **Webpack**, we can also handle the Stylesheet (CSS, SASS, LESS, etc.) bundling, and for this particular tutorial I'll demonstrate that with [LESS](http://lesscss.org/), as we'll use the [react-bootstrap](http://react-bootstrap.github.io/getting-started.html) library to simplify our development process.

To do so, we need to install the following loaders: 

```
npm install less-loader less style-loader css-loader url-loader extract-text-webpack-plugin --save-dev
```

We also need to install [bootstrap](http://getbootstrap.com/) and [react-bootstrap](http://react-bootstrap.github.io/getting-started.html):

```
npm install bootstrap react-bootstrap --save 
```

Create a file named `main.less` in `src/client/styles` with the following contents:

{: .language-less}
```
@import "~bootstrap/less/bootstrap.less";
```

We could have also just included the Bootstrap CSS from a CDN, but we're including it in our styles so we can customize it (and of course demonstrate how all this works).

Now we need to make sure Webpack bundles our LESS files and watches for changes. To do so, we need to configure the loaders we've just installed. 

Add the following to `webpack.config.js`:

{: .language-javascript}
```
// existing code
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// existing code
var STYLE_DIR = path.resolve(__dirname, 'src/client/styles');

var config = {
  cache:true,
  entry: [
    // existing code
    STYLE_DIR + '/main.less'
  ],
  output: {
    // existing code
    sourceMapFilename: '[file].map'
  },
  devtool: 'eval',
  module : {
    loaders : [
      // existing code
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!less?sourceMap"),
        include: STYLE_DIR
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=100000&name=fonts/[name].[ext]',
        include: [
          APP_DIR,
          path.resolve(__dirname, 'node_modules/bootstrap/fonts')
        ]
      }
    ]
  },
  plugins: [
    // existing code
    new ExtractTextPlugin("styles/style.css", {allChunks: false})
  ]
};

module.exports = config;
```

There are many things going on in our config, but I'll highlight the essentials:

- We added the `main.less` file as an entry point
- We added the **LESS & CSS loaders**, and we've set them to watch .less files in our styles folder
- We added the **url-loader** to watch for font files in our app folder and the bootstrap fonts folder (as we need to load the glyphicon fonts)
- We've set up the **ExtractTextPlugin** for styles in order to bundle them in a `style.css` file. If we didn't, the styles would have been inlined in the HTML file's header.
- We've enabled source-maps for our files to make things easier to debug

Now running `npm start` should serve us the project with the JS and CSS bundles included.

To test that everything works properly, change the `index.jsx` contents to:

{: .language-jsx}
```

import React from 'react';
import { render } from 'react-dom';
import { Glyphicon } from 'react-bootstrap';

class App extends React.Component {
  render () {
    return (
      <p>
        <Glyphicon glyph="star" />

        Hello React!
      </p>
    );
  }
}

render(<App />, document.getElementById('app'));
```

After saving the file, webpack should rebuild and the changes should be reflected in the browser without needing to refresh the page.

Now try adding this to the `main.less` file (or anything you want, really. Just make sure it's valid LESS code):

{: .language-less}
```
body {
  background: purple;
  color: white;
}
```
or try changing some bootstrap variables like:

{: .language-less}
```
@font-family-base: "Comic Sans MS";
@font-size-base: 24px;
```

Looking sharp, doesn't it? 

**Note: While there are a few other ways of styling React Components (CSS Modules seems to be popular nowadays), there are quite some drawbacks to them, [as presented here](http://jamesknelson.com/why-you-shouldnt-style-with-javascript/) and most of all, they're not as simple to grasp. If you can style a HTML with CSS, you can style JSX.**

## What about production builds?

Productions builds are slightly different than development builds, as we need to compress the code as much as possible.

It's quite easy to do that with **Webpack**, actually running our `npm run build` task does that, but it can be improved.

Install the following module:
```
npm install clean-webpack-plugin --save-dev
```

Now let's create a `webpack-production.config.js` file as follows:

{: .language-javascript}
```
var webpack = require('webpack');
var path = require('path');

var devConfig = require('./webpack.config.js');
var BUILD_DIR = path.resolve(__dirname, 'dist');

var CleanWebpackPlugin = require('clean-webpack-plugin');

devConfig.devtool = 'cheap-module-source-map';

// Remove the Hot Module Replacement entry points
devConfig.entry.splice(0,2);

// Remove the HMR plugin
devConfig.plugins.splice(1, 1);

// Add code optimisations
devConfig.plugins = devConfig.plugins.concat([
  new CleanWebpackPlugin(BUILD_DIR),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.optimize.DedupePlugin()
]);

module.exports = devConfig;
```

What we're doing here is simply importing our regular webpack config, removing HMR stuff from it, changing the source-map type to the most concise one and adding some plugins to optimize the code (and CleanWebpackPlugin to clean our dist folder everytime we make a build.

The last step is adjusting the `package.json` to use the new config for production builds:

{: .language-json}
```
// existing code
"scripts": {
  "start": "webpack-dev-server --config webpack.config.js --progress",
  "build": "webpack --config webpack-production.config.js -p --progress"
},
// existing code
```

## ...and linting?

Webpack also supports linting loaders, which are executed everytime the code is rebuilt so you can easily fix errors before even running your app. We're going to use [eslint](http://eslint.org/) for this, but there are [a few other alternatives](https://www.sitepoint.com/comparison-javascript-linting-tools/).

Let's install them:

```
npm install --save-dev babel-eslint eslint eslint-loader eslint-plugin-react
```

We're going to touch `webpack.config.js` again:

{: .language-javascript}
```
// existing code
loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loaders : [
          'react-hot', // Here we enable Hot-Module-Reloading for React Components
          'babel'
        ]
      },
      {
        test: /\.jsx?/,
        loader: "eslint",
        exclude: /node_modules/
      },
    ...
},
eslint: {
  configFile: '.eslintrc'
},
      // existing code 
      // eslint-loader MUST be placed right after babel, in order to check the files BEFORE they are compiled.
```

and create a `.eslintrc` file with the following contents:

{: .language-json}
```
{
  "parser": "babel-eslint", // I want to use babel-eslint for parsing!
  "rules": {
    "comma-dangle": 0, // dangling commas are ok
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "jsx-quotes": 1,
    "quotes": [2, "single"],
    "react/display-name": 1,
    "react/forbid-prop-types": 1,
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": [2, 2],
    "react/jsx-max-props-per-line": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-sort-props": 1,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 1,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/sort-prop-types": 1,
    "react/wrap-multilines": 1,
    "semi": [1, "always"],
    "no-console": 0
  },
  "env": {
    "es6": true,
    "browser": true,
    "mocha": true
  },
  "extends":  ["eslint:recommended", "plugin:react/recommended"],
  "ecmaFeatures": {
    "jsx": true,
    "experimentalObjectRestSpread": true
  },
  "plugins": [
    "react"
  ]
}
```

This file is the eslint configuration. I won't go into details with it because it's not an essential part of the React module, but you can read more about it in the [docs](http://eslint.org/docs/user-guide/configuring)
