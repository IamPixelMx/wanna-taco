import axios from 'axios';

const API_URL = process.env.MOCK_API_URL;

export const getMelpData = async () => {
  const response = await axios.get(API_URL);
  const { data } = response;
  // const melpData = JSON.parse(data);
  console.log('data desde axios: ', data);
  // console.log('melpData desde axios: ', melpData);

  return data;
};
