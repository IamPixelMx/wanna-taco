import { axios, API_BASE_URL } from 'utils';

export const getMelpData = async () => {
  const melpData = await axios.get(API_BASE_URL);
  console.log('Melp Data: ', melpData);

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
