import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../apps/store';
import { login, refresh } from './authThunk';

export interface AuthState {
  token: string;
  username: string;
}

const initialState: AuthState = {
  token: '',
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.username = payload.username;
      })
      .addCase(login.rejected, (state) => {
        state.token = '';
        state.username = '';
      });

    builder
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.username = payload.username;
      })
      .addCase(refresh.rejected, (state) => {
        state.token = '';
        state.username = '';
      });
  },
});

export const selectAuthUsername = (state: RootState) => state.auth.username;

export default authSlice;
