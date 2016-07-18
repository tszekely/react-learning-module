import APP_CONSTANTS from '../../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

import AppDispatcher from '../../dispatcher/AppDispatcher';

const CartActions = {
  addProductToCart(product, quantity) {
    AppDispatcher.handleViewAction({
      actionType: ACTION_TYPES.CART.ADD_PRODUCT_TO_CART,
      data: {
        product,
        quantity
      }
    });
  }
};

export default CartActions;