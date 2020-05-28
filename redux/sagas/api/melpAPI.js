import axios from 'axios';

const API_URL = process.env.MOCK_API_URL;

export const getMelpData = async () => {
  const melpData = await axios.get(API_URL);
  console.log('Melp Data desde axios: ', melpData);

  return melpData;
};

// export const getMelpData = async () => {
//   const response = await fetch('/__mocks__/api.js');
//   //Entra a a data
//   const json = await response.json();
//   const { data } = json;
//   console.log(data);

//   return data;
// };
