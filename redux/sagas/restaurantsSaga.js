import { call, takeLatest, put } from 'redux-saga/effects';
import { getMelpData } from './api';
import { GET_MELP_RESTAURANTS_DATA } from '../constants';
import { getMelpRestaurantsDataError, getMelpRestaurantsDataSuccess } from '../actions';

function* getData() {
  try {
    const request = yield call(getMelpData);
    yield put(getMelpRestaurantsDataSuccess(request));
  } catch (error) {
    console.error(error);
    yield put(getMelpRestaurantsDataError(error));
  }
}

function* restaurantsSagas() {
  yield takeLatest(GET_MELP_RESTAURANTS_DATA, getData);
}

export default restaurantsSagas;
