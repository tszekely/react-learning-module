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