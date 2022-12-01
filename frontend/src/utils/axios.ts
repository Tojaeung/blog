import axios, { AxiosRequestConfig } from 'axios';
const { VITE_BASE_URL } = import.meta.env;

import { decodeToken } from './jwt';
import { reissueToken } from 'apis/auth';

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

adminApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken && decodeToken(accessToken)) {
    try {
      const auth = await reissueToken();
      auth && localStorage.setItem('accessToken', auth.accessToken);
    } catch (err: any) {
      alert('토큰재발급 실패하였습니다. 다시 로그인 해주세요.');
      localStorage.removeItem('accessToken');
    }
  }

  (err: any) => {
    return Promise.reject(err);
  };

  return config;
});
