import axios from 'axios';
import { BASE_URL } from './Constanst';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
  validateStatus: status => {
    return status >= 200 && status <= 500;
  },
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function (data, headers) {
      if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
        return data;
      }
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default API;
