import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'apps/store';
import axios from 'axios';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { selectAuthAccessToken, selectAuthUsername } from './authSlice';
import { LoginParamType, LoginReturnType, RefreshParamType, RefreshReturnType } from './type';

export const login = createAsyncThunk<
  LoginReturnType,
  LoginParamType,
  { state: RootState; rejectValue: { msg: string } }
>('auth/login', async (data, thunkApi) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, data, { withCredentials: true });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const refresh = createAsyncThunk<RefreshReturnType, void, { state: RootState; rejectValue: { msg: string } }>(
  'auth/refresh',
  async (data, thunkApi) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const test = createAsyncThunk<String, void, { state: RootState; rejectValue: { msg: string } }>(
  'auth/test',
  async (data, thunkApi) => {
    const accessToken = useAppSelector(selectAuthAccessToken);
    try {
      const res = await axios.get('/admin/test', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
