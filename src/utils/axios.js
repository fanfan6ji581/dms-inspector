import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_DMS_API}inspector/`,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   if (window.location.pathname != '/login') {
    //     window.location = '/login';
    //   }
    // }
    return Promise.reject(error);
  }
);

export default instance;
