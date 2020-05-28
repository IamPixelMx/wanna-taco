export const restaurants = {
  data: null,
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
