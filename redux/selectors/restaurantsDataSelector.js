import { createSelector } from 'reselect';

const restaurantsDataSelector = state => state.restaurantsReducer.sections;
export const getSections = createSelector([restaurantsDataSelector], sections => sections);
