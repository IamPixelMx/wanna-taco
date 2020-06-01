import {
  GET_MELP_RESTAURANTS_DATA,
  GET_MELP_RESTAURANTS_DATA_ERROR,
  GET_MELP_RESTAURANTS_DATA_SUCCESS,
  SET_ACTIVE_CATEGORIE,
  SET_SORTED_DATA,
} from '../constants';

import { restaurants } from '../models';

const INITIAL_STATE = restaurants;

const restaurantsReducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case GET_MELP_RESTAURANTS_DATA:
      return { ...state, loading: true };

    case GET_MELP_RESTAURANTS_DATA_ERROR:
      return { ...state, error: payload, loading: false };

    case GET_MELP_RESTAURANTS_DATA_SUCCESS:
      return {
        ...state,
        categories: { ...state.categories, all: payload },
        loading: false,
        error: '',
      };

    case SET_ACTIVE_CATEGORIE:
      return { ...state, activeCategorie: payload };

    case SET_SORTED_DATA:
      return { ...state, categories: { ...state.categories, ...payload } };

    default:
      return state;
  }
};

export default restaurantsReducer;
