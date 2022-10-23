import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'apps/store';
import { adminInstance, apiInstance } from 'apps/axios';

interface LoginReturnType {
  token: string;
  username: string;
}

interface LoginParamType {
  username: string;
  password: string;
}

export const login = createAsyncThunk<
  LoginReturnType,
  LoginParamType,
  { state: RootState; rejectValue: { msg: string } }
>('auth/login', async (data, thunkApi) => {
  try {
    const res = await apiInstance.post('/api/login', data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

interface RefreshReturnType {
  token: string;
  username: string;
}

export const refresh = createAsyncThunk<RefreshReturnType, void, { state: RootState; rejectValue: { msg: string } }>(
  'auth/refresh',
  async (data, thunkApi) => {
    try {
      const res = await adminInstance.get('/api/refresh');
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
