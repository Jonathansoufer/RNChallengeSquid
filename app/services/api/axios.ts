import { log } from '@/utils';
import axios from 'axios';
import { Config } from 'react-native-config';

const BASE_URL = Config.COINMARKETCAP_API_URL;
const BASE_KEY = Config.COINMARKETCAP_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-CMC_PRO_API_KEY': BASE_KEY,
  },
  timeout: 5000,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.message === 'Network Error' || error.response.status >= 500) {
      log('Retrying the request...');
      let retryCount = 0;
      const maxRetryAttempts = 3;
      const retryDelay = 1000;

      while (retryCount < maxRetryAttempts) {
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));

        try {
          const response = await api.request(originalRequest);
          return response.data;
        } catch (error) {
          if (retryCount === maxRetryAttempts) {
            throw error;
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
