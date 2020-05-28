import { createSelector } from 'reselect';

const restaurantsDataSelector = state => state.restaurantsReducer.data;
export const getRestaurantsData = createSelector([restaurantsDataSelector], data => data);
