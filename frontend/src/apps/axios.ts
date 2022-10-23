import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

// 일반 api 요청 인스턴스 (인증 필요없음)
export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// 어드민만 요청가능한 인스턴스 (인증 필요함)
export const adminInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    Authorization: `Bearer ${cookie.get('token')}`,
  },
  withCredentials: true,
  timeout: 10000,
});
