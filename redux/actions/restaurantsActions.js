import {
  GET_MELP_RESTAURANTS_DATA,
  GET_MELP_RESTAURANTS_DATA_ERROR,
  GET_MELP_RESTAURANTS_DATA_SUCCESS,
  SET_ACTIVE_CATEGORIE,
  SET_SORTED_DATA,
} from '../constants';

export const getMelpRestaurantsData = () => ({
  type: GET_MELP_RESTAURANTS_DATA,
});

export const getMelpRestaurantsDataError = payload => ({
  type: GET_MELP_RESTAURANTS_DATA_ERROR,
  payload,
});

export const getMelpRestaurantsDataSuccess = payload => ({
  type: GET_MELP_RESTAURANTS_DATA_SUCCESS,
  payload,
});

export const setActiveCategorie = payload => ({
  type: SET_ACTIVE_CATEGORIE,
  payload,
});

export const setSortedData = payload => ({
  type: SET_SORTED_DATA,
  payload,
});
