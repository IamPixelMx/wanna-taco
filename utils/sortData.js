const sortData = (data, type) => {
  switch (type) {
    case 'MOST_RATED':
      return data.sort((a, b) => b.rating - a.rating);
    case 'LEAST_RATED':
      return data.sort((a, b) => a.rating - b.rating);
    case 'A-Z':
      return data.sort((a, b) => (a.name > b.name ? 1 : -1));
    case 'Z-A':
      return data.sort((a, b) => (a.name < b.name ? 1 : -1));
    default:
      return data;
  }
};

export default sortData;
