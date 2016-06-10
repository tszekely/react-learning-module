---
layout: default
title: Step 2 - Creating the main App Component | React Learning Module
---

# Step 2 - Creating the layout Components

## Creating the main App Component

Now that we have a solid build system set up and **react-bootstrap** installed
We're going to build our app, starting with the app entry point.

Let's run the dev build with `npm start` and add this to the `main.less` file:

~~~less
html {
  height: 100%;
}

body {
  min-height: 100%;
}

#app {
  min-height: 100vh;
}
~~~
{: .language-less}

Everything compiles properly? If yes, then you're good to go. If not, check [Step 1](/step-01) and make sure you followed the instructions correctly.

As you might have noticed in the **React** part of Step 1, we are using [JSX](https://facebook.github.io/jsx/), React's XML-like syntax for creating components. What we did there was not quite right, so we'll fix it now.

First we're going to rename `index.jsx` to `index.js` (don't forget to change that in the `webpack.config.js` entry too),
then create a file named `App.jsx` in `src/client/app/components` (yes, create a new folder).

Now let's move the following lines from `index.js` to `App.jsx`

~~~jsx
import React from 'react';

import { Glyphicon } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <div>
        <Glyphicon glyph="star" />

        Hello React!
      </div>
    );
  }
}
~~~
{: .language-jsx}

and add

~~~jsx
export default App;
~~~
{: .language-jsx}

Now in `index.js`:
~~~jsx
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

render(<App />, document.getElementById('app'));
~~~
{: .language-jsx}

What we just did is we created a new [React Component](https://facebook.github.io/react/docs/component-api.html) which will act as our main component. Next we'll create the Header and the Footer.

**Note: As you probably noticed, we are using the [ES6 Class Syntax](https://facebook.github.io/react/docs/reusable-components.html#es6-classes). Although I personally prefer the React.createClass syntax, it seems that [it might be deprecated in the future](https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html), so it's better to get familiar with the "latest, greatest" one.**

## The Header Component

Let's create a file named `Header.jsx` in `src/client/app/components` with the following content:

~~~jsx
import React from 'react';

import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              Our Awesome Store
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem
              eventKey={1}
              href="#">
              Home
            </NavItem>
            <NavItem
              eventKey={2}
              href="#">
              Shop
            </NavItem>
            <NavItem
              eventKey={3}
              href="#">
              <Glyphicon glyph="shopping-cart" />
              {' Cart'}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;
~~~
{: .language-jsx}

and import it in our `App.jsx` (let's also remove the test items there):

~~~jsx
import React from 'react';

import Header from './Header.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
~~~
{: .language-jsx}

As you can see, we've used some react-bootstrap components: **Navbar, Nav, NavItem, Glyphicon**. These are basically rendered to DOM elements and using them saves us a lot of time. The elements above are rendered as follows:

~~~html
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header"><a href="/" class="navbar-brand">Our Awesome Store</a>
      <button type="button" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span
        class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li role="presentation" class=""><a role="button" href="#">Home</a></li>
        <li role="presentation" class=""><a role="button" href="#">Shop</a></li>
        <li role="presentation" class=""><a role="button" href="#"><span
          class="glyphicon glyphicon-shopping-cart"></span><!-- react-text: 20 --> Cart<!-- /react-text --></a></li>
      </ul>
    </div>
  </div>
</nav>
~~~
{: .language-html}

The **Header** component is a regular React Component, and although it's currently stateless, we will add some state to it in one of the next steps.

## The Footer Component
Now we're going to build a simple footer. As it's going to be just a few links or some text, we'll create it as a [Functional Component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions), (obviously, as `Footer.jsx` in the `src/client/app/components` folder):

~~~jsx
import React from 'react';
import { Grid, Nav, NavItem } from 'react-bootstrap';

function Footer(/*props*/) {
  return (
    <footer>
      <Grid>
        <Nav justified>
          <NavItem
            eventKey={1}>
            Privacy policy
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
          <NavItem
            eventKey={3}>
            Some other professional link
          </NavItem>
        </Nav>

        <div className="text-center small copyright">
          © RLM 2016
        </div>
      </Grid>
    </footer>
  );
}

export default Footer;
~~~
{: .language-jsx}

and the of course import it in `App.jsx` (let's also create a wrapper for the content) :

~~~jsx
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  render() {
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

Now let's add some styling (in `main.less`):

~~~less
// existing code

#content {
  padding-top: 70px;
  min-height: ~"calc(100vh - 92px)";
}

footer {
  .navbar;
  .navbar-default;
  border-radius: 0 !important;
  border-bottom: 0;
  margin: 20px 0 0;

  .copyright {
    padding-top: @padding-small-horizontal / 2;
    padding-bottom: @padding-small-horizontal;
  }
}

~~~
{: .language-less}

...and voila! We have a decent-looking main layout (and responsive too!).

[![Main store layout](http://puu.sh/pnKUh/7ef44daaf6.png){: .img-responsive}](http://puu.sh/pnKUh/7ef44daaf6.png)
