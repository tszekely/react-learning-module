import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import AppDispatcher from '../../dispatcher/AppDispatcher';

const ProductActions = {
  productsLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCTS_LOADED,
      data
    });
  },

  productLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCT_LOADED,
      data
    });
  },

  productLoadFailed() {
    AppDispatcher.handleServerAction({
      actionType: ACTION_TYPES.PRODUCTS.PRODUCT_LOAD_FAILED
    });
  }
};

export default ProductActions;