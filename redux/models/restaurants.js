import { mock_all } from '../sagas/api/miniAPI';

export const restaurants = {
  categories: {
    all: mock_all,
    desserts: null,
    coffee: null,
    oriental: null,
    tacos: null,
    vegie: null,
  },
  activeCategorie: 'all',
  currentRestaurant: {
    id: null,
    rating: null,
    name: null,
    contact: {
      site: null,
      email: null,
      phone: null,
    },
    address: {
      street: null,
      city: null,
      state: null,
      location: { lat: null, lng: null },
    },
  },
  error: false,
  loading: false,
};
