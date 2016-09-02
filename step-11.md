---
layout: default
title: Step 11 - Server Side Rendering | React Learning Module
---

# Step 11 - Server Side Rendering

As a bonus step of the module, I'll give you some guidelines on Server Side Rendering with Node.js. This part assumes you know basic [Node.js](https://nodejs.org/en/docs/) and [Express](https://expressjs.com/) usage. If you don't, I strongly suggest reading some guides/docs on them before, otherwise a lot of stuff won't make sense to you (the official docs/guides above are a good starting point)

As usual, I'll start off with a few links:

- [Should I use React Server-Side Rendering?](http://andrewhfarmer.com/server-side-render/) - this is the first step; do you really need it? There is one thing I disagree with though. I'd rather advise to decide if you need SSR **before** you actually start building it, as some things will behave totally different
- [Redux Docs Server Side Rendering](http://redux.js.org/docs/recipes/ServerRendering.html)
- [Isomorphic React Apps with React-Engine](https://www.paypal-engineering.com/2015/04/27/isomorphic-react-apps-with-react-engine/)

One important thing to note is that there are many ways of using React on the server and this one we're using is just an example of what/how you can do. For this example, I'm using [React-Engine](https://github.com/paypal/react-engine).

Here is the full commit with the changes I've made to the Awesome Store we've build in the last steps to suport SSR:
[Github Commit](https://github.com/tszekely/react-learning-module/commit/bdaff6ee2cccfae88f157e801eb75456ddae0b03#diff-25d902c24283ab8cfbac54dfa101ad31)

I won't copy much of the code here, I'll just try to explain each change.

**Note: I used Node v6.2.0. If errors occur on the server side, make sure you have a Node version >= 6.2.0.**

## Preparing the switch to SSR

First things first, install the following modules:

- DevDependencies: `nodemon`, `concurrently`
- Dependencies: `babel-register`, `express`, `react-engine`, `serve-favicon`

Then we make some changes to the [webpack.config.js](https://github.com/tszekely/react-learning-module/blob/bdaff6ee2cccfae88f157e801eb75456ddae0b03/webpack.config.js) file to:

- eliminate Hot Module Reloading
- output the results to `src/server/public` instead of `dist` folder
- include the `react-engine` folder in the `json-loader` look-in folders (it uses some config from a JSON file and if we don't use the JSON loader to load it, webpack chokes on it)
- add a favicon to avoid weird errors from the server (as our server is just the bare minimum); you can find the one I used in the commit [here](https://raw.githubusercontent.com/tszekely/react-learning-module/bdaff6ee2cccfae88f157e801eb75456ddae0b03/favicon.ico)
- ditch the `webpack-dev-server` as we'll use our own server (see the [package.json](https://github.com/tszekely/react-learning-module/blob/bdaff6ee2cccfae88f157e801eb75456ddae0b03/package.json) scripts section); we run the dev server using `npm run dev` now, the production build remains the same and the server is started with `npm start`

## Making the changes 

#### Actions

- export the `ProductActions` methods independently so we can import them in our Node app

#### Components

- `App.jsx`: render **all** the HTML in the component + the main layout
- `NotFound.jsx`: check if the app can use the DOM (AKA is rendered on the client) and set the URL accordingly; Node chockes on *requiring* the image
- `ProductList.jsx`: to make things more interesting, pagination is reflected in the URL query (ex.: `?page=1`); the product list 'page' loaded is according to the page in the query (or page 1 if it's invalid)
- `index.js`: extract the routes to `routes.jsx` so we can import them on both client & server; bootstrap the `react-engine` client-side

#### Stores

Probably the most important part:
`React-Engine` sets the initial state of the app on the window, so we check if the DOM can be used and if the data is there, and if the condition is true, the store is initialized with it (to avoid requesting the same information twice)

#### API

We just return the response of the requests so we can further chain Promises

## Setting up the Server

The server will be located in `src/server` (makes sense why we changed the webpack output now?) and it'll be the [app.js](https://github.com/tszekely/react-learning-module/blob/bdaff6ee2cccfae88f157e801eb75456ddae0b03/src/server/app.js) file

- start off with [babel-register](https://babeljs.io/docs/usage/require/) because: "All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel." 
- `require` the necessary modules (you might notice that some of those don't exist yet and trying to start the server won't work) and the Product Actions
- create the Express app and set the [template engine](https://expressjs.com/en/guide/using-template-engines.html) to `react-engine`; as options, we define the routes and set the script location (for the initial state) to `'head'` so that they're declared when the client scripts check for them
- set the static resource folder to `/public`
- declare the routes where we need to preload the data before rendering the page (`/shop` and `/shop/:id`); before rendering the components, we request the data needed (Product list / Product) and then the render the views with the initial state we get from the requests (it's a good idea to properly handle errors too, I din't in this example)
- finally, we catch all the remaining routes "*" and serve the view with no initial state and listen to NODE_IP:NODE_PORT or localhost:8080 if they're not defined




