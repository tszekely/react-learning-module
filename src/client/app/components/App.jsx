import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
// import ProductList from '../components/ProductList.jsx';
// import ProductPage from '../components/ProductPage.jsx';

import products from '../Products.json';

import { Grid } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Grid id="content">
          {
            React.cloneElement(
              this.props.children,
              {
                products: this.state.products
              }
            )
          }
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;