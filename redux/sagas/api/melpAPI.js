import axios from 'axios';

const API_URL = process.env.MOCK_API_URL;

export const getMelpData = async () => {
  const response = await axios.get(API_URL);
  const melpData = await response.data;
  console.log('Melp Data[2] desde axios: ', melpData[2]);

  return melpData;
};
