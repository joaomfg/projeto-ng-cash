import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestData = async (endpoint, token) => {
  const { data } = await api.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return data;
};

export const sendData = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const sendDataToken = async (endpoint, token) => {
  const { data } = await api.post(endpoint, {}, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return data;
};

export const sendTransaction = async (endpoint, data, token) => {
  const response = await api.post(endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return response.data;
};

export default api;
