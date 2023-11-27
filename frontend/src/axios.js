// axios.js
import axios from 'axios';
import getCookie from './helpers/getToken';

const axiosYns = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});
// const axiosYns = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });

axiosYns.interceptors.request.use(function (config) {
  const token = getCookie('token') ? getCookie('token') : "";  ;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosYns;
