import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

export const clientApi = axios.create({
  baseURL: `${VITE_BASE_URL}/api`,
  withCredentials: true,
});

export const adminApi = axios.create({
  baseURL: `${VITE_BASE_URL}/api/admin`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
});
