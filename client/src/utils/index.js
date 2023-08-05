import axios from 'axios';
const token = localStorage.getItem('token');

export const config = {
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-origin': '*',
  },
};

if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}

export const fetchRequest = async (endpoint) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
    config
  );
  return data;
};

export const createRequest = async (endpoint, newData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
    JSON.stringify(newData),
    config
  );
  return data;
};

export const deleteRequest = async (endpoint) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
    config
  );
  return data;
};
