import axios from 'axios';

const API_URL = process.env.MOCK_API_URL;

export const getMelpData = async () => {
  const response = await axios.get(API_URL);
  const melpData = await response.data;
  console.log('melpData desde axios: ', melpData);
  console.log('response desde axios: ', response);

  return response;
};
