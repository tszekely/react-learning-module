import React from 'react';
import { render } from 'react-dom';

import NotFound from './components/NotFound.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));