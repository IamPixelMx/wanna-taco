import axios from 'axios';

export const API_BASE_URL = process.env.API_URL || 'http://localhost:3001/__mocks__/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
