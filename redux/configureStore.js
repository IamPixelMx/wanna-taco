import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import initialState from './initialState';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const { composeWithDevTools } = require('redux-devtools-extension');
    const options = {
      /*
       *Here you can add options to implement with redux
       */
    };
    const composeEnhancers = composeWithDevTools(options);
    return composeEnhancers(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configureStore = (preloadedState = initialState, { isServer, req = null }) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]));

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }
  return store;
};

export default configureStore;
