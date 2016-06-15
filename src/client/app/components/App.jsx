import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ProductList from '../components/ProductList.jsx';

import products from '../Products.json';

import { Grid } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products.slice(0, 12)
    };
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Header />
        <Grid id="content">
          <ProductList
            products={products} />
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;