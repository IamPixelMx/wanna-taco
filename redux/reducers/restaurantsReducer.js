import {
  GET_MELP_RESTAURANTS_DATA,
  GET_MELP_RESTAURANTS_DATA_ERROR,
  GET_MELP_RESTAURANTS_DATA_SUCCESS,
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
        restaurants: {
          sections: {
            all: payload,
          },
        },
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};

export default restaurantsReducer;
