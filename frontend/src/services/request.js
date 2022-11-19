import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const sendData = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const sendDataToken = async (endpoint, token) => {
  console.log(endpoint, token);
  const { data } = await api.post(endpoint, {}, {
    headers: {
      'content-type': 'application/json',
      authorization: token
    }
  });
  return data;
};

export const deleteUser = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export const updateUser = async (endpoint, body) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export default api;
