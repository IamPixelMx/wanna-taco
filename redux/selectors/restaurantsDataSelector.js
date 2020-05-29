import { createSelector } from 'reselect';

const restaurantsDataSelector = state => state.restaurantsReducer.categories;
export const getCategories = createSelector([restaurantsDataSelector], categories => categories);

const activeCategorieSelector = state => state.restaurantsReducer.activeCategorie;
export const getActiveCategorie = createSelector(
  [activeCategorieSelector],
  activeCategorie => activeCategorie,
);
