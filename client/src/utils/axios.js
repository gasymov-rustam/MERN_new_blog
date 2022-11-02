import axios from 'axios';

export const instanceApi = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instanceApi.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});
