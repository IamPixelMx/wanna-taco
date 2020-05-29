import { combineReducers } from 'redux';

import restaurantsReducer from './restaurantsReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
});

export default rootReducer;
