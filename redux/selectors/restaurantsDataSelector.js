import { createSelector } from 'reselect';

const stateSelector = state => state;
export const getState = createSelector([stateSelector], state => state);

const restaurantsDataSelector = state => state.restaurants.categories;
export const getCategories = createSelector([restaurantsDataSelector], categories => categories);

const activeCategorieSelector = state => state.restaurants.activeCategorie;
export const getActiveCategorie = createSelector(
  [activeCategorieSelector],
  activeCategorie => activeCategorie,
);
