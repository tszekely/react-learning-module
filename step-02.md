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

Everything compiles properly? If yes, then you're good to go. If not, check [Step 1]({{ site.github.url }}/step-01) and make sure you followed the instructions correctly.

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

What we just did is we created a new [React Component](https://facebook.github.io/react/docs/component-api.html) which will act as our main component. In the next step we'll create the Header and the Footer.
