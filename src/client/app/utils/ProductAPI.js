import Backendless from 'backendless';

import ProductActions from '../actions/server/ProductActions';

const ProductStorage = Backendless.Persistence.of('Products');


const ProductAPI = {
  getProducts(page = 0, pageSize = 24) {
    return ProductStorage.find({
      options: {
        pageSize: pageSize,
        offset: (page - 1) * pageSize
      }
    }).then((response) => {
      ProductActions.productsLoaded(response);

      return response;
    });
  },

  getProductById(productId) {
    return ProductStorage.findById(productId).then((response) => {
      response.id = productId;
      ProductActions.productLoaded(response);

      return response;
    }).catch((/*error*/) => {
      ProductActions.productLoadFailed();
    });
  }
};

export default ProductAPI;