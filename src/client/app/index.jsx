import React from 'react';
import { render } from 'react-dom';
import { Glyphicon } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <p>
        <Glyphicon glyph="star" />

        Hello React!
      </p>
    );
  }
}

render(<App />, document.getElementById('app'));