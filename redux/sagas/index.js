import { all } from 'redux-saga/effects';
//sagas
import restaurantsSaga from './restaurantsSaga';

function* rootSaga() {
  yield all([restaurantsSaga()]);
}

export default rootSaga;
