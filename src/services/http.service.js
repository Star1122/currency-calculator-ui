import axios from 'axios';

import config from 'config';

const http = axios.create({ baseURL: `${config.apiUrl}/` });

function get(url, headers = {}, params = {}) {
  return http.get(url, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function put(url, data, headers = {}, params = {}) {
  return http.put(url, data, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function remove(url, headers = {}, params = {}) {
  return http.delete(url, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

export default {
  http,
  get,
  post,
  put,
  remove,
};
