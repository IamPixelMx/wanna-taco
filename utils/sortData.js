const sortData = (data, type) => {
  switch (type) {
    case 'MOST_RAITED':
      return (sortedData = data.sort((a, b) => a.raiting - b.raiting));
    case 'LEAST_RAITED':
      return (sortedData = data.sort((a, b) => b.raiting - a.raiting));
    case 'A-Z':
      return (sortedData = data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    case 'Z-A':
      return (sortedData = data.sort((a, b) => (a.name < b.name ? 1 : -1)));
    default:
      return data;
  }
};

export default sortData;
