import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

export default instance;
