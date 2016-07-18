import { Map } from 'immutable';

let _cartItems = Map(),
  _isLoading = true;

import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';

import APP_CONSTANTS from '../constants/AppConstants';
const { ACTION_TYPES } = APP_CONSTANTS;

const CHANGE_EVENT = 'CHANGE';

function addProductToCart(product, quantity) {
  _cartItems = _cartItems.update(product.id, (p) => {
    return p ?
      {
        ...p,
        quantity: p.quantity + quantity
      } :
      {
        product,
        quantity: quantity
      };
  });
}

const CartStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return _cartItems;
  },

  getLoadingState() {
    return _isLoading;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CartStore.dispatcherIndex = AppDispatcher.register((payload) => {
  const { action } = payload;

  switch (action.actionType) {
    case ACTION_TYPES.CART.ADD_PRODUCT_TO_CART:
      addProductToCart(action.data.product, action.data.quantity);
      CartStore.emitChange();
      break;
  }
});


export default CartStore;