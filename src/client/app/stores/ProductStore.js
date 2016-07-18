let _products = [],
  _currentPage = 1,
  _totalPages = 1,
  _isLoading = true;

import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';

import APP_CONSTANTS from '../constants/AppConstants';
const { ACTION_TYPES, PAGE_SIZE } = APP_CONSTANTS;

const CHANGE_EVENT = 'CHANGE';

function _loadProductData(data) {
  _products = data.data.map(product => ({ ...product, id: product.objectId }));
  _currentPage = data.offset / PAGE_SIZE + 1;
  _totalPages = Math.ceil(data.totalObjects / PAGE_SIZE);
  _isLoading = false;
}

const ProductStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return _products;
  },

  getOneById(productId) {
    return _products.find((p) => p.id === productId);
  },

  getCurrentPage() {
    return _currentPage;
  },

  getTotalPages() {
    return _totalPages;
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

ProductStore.dispatcherIndex = AppDispatcher.register((payload) => {
  const { action } = payload;

  switch (action.actionType) {
    case ACTION_TYPES.PRODUCTS.GET_PRODUCTS:
    case ACTION_TYPES.PRODUCTS.GET_PRODUCT_BY_ID:
      _isLoading = true;
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCTS_LOADED:
      _loadProductData(action.data);
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCT_LOADED:
      _products.push(action.data);
      _isLoading = false;
      ProductStore.emitChange();
      break;

    case ACTION_TYPES.PRODUCTS.PRODUCT_LOAD_FAILED:
      _isLoading = false;
      ProductStore.emitChange();
      break;

  }
});


export default ProductStore;