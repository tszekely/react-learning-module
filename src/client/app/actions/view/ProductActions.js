import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import ProductAPI from '../../utils/ProductAPI';
import AppDispatcher from '../../dispatcher/AppDispatcher';

const ProductActions = {
  getProducts(page, pageSize) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.PRODUCTS.GET_PRODUCTS,
      data: {
        page,
        pageSize
      }
    });

    return ProductAPI.getProducts(page, pageSize);
  },

  getProductById(productId) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.PRODUCTS.GET_PRODUCT_BY_ID,
      data: {
        productId
      }
    });

    return ProductAPI.getProductById(productId);
  }
};

export const getProducts = ProductActions.getProducts;

export const getProductById = ProductActions.getProductById;

export default ProductActions;
