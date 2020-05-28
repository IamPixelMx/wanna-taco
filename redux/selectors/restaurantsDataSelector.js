import { createSelector } from 'reselect';

const restaurantsDataSelector = state => state.restaurants.data;
export const getRestaurantsData = createSelector([restaurantsDataSelector], data => data);
