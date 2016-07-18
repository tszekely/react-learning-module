import { Dispatcher } from 'flux';

import APP_CONSTANTS from '../constants/AppConstants';

const AppDispatcher = Object.assign(
  new Dispatcher(),
  {
    handleViewAction(action) {
      console.info(APP_CONSTANTS.ACTION_SOURCES.VIEW_ACTION, action);

      this.dispatch({
        source: APP_CONSTANTS.ACTION_SOURCES.VIEW_ACTION,
        action
      });
    },

    handleServerAction(action) {
      console.info(APP_CONSTANTS.ACTION_SOURCES.SERVER_ACTION, action);

      this.dispatch({
        source: APP_CONSTANTS.ACTION_SOURCES.SERVER_ACTION,
        action
      });
    }
  }
);

export default AppDispatcher;