import { combineReducers } from 'redux';

import restaurantsReducer from './restaurantsReducer';

const rootReducer = combineReducers({
  restaurantsReducer,
});

export default rootReducer;
