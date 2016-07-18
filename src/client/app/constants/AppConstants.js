import keyMirror from 'fbjs/lib/keyMirror';

const APP_CONSTANTS = {
  ACTION_SOURCES: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  }),

  BACKENDLESS: {
    APPLICATION_ID: '3D108505-7C5D-6740-FFF2-348F8D69EC00',
    SECRET_KEY: '48697205-51A9-520B-FFDD-E81D6467DE00',
    VERSION: 'v1'
  },

  ACTION_TYPES: {
    PRODUCTS: keyMirror({
      GET_PRODUCTS: null,
      PRODUCTS_LOADED: null,
      GET_PRODUCT_BY_ID: null,
      PRODUCT_LOADED: null,
      PRODUCT_LOAD_FAILED: null
    }),

    CART: keyMirror({
      ADD_PRODUCT_TO_CART: null,
      EMPTY_CART: null
    })
  },

  PAGE_SIZE: 24
};

export default APP_CONSTANTS;