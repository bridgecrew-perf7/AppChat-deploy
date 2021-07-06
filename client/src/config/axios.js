import axios from 'axios';

export const serverUrl = 'https://appchat-connect-server.herokuapp.com';

const instanceAxios = axios.create({
  baseURL: serverUrl,
  timeout: 2000,
});

export const setAuthToken = (token) => {
  if (token) {
    instanceAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instanceAxios.defaults.headers.common['Authorization'];
  }
};

export default instanceAxios;
