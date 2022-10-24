import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../apps/store';
import { login, refresh } from './authThunk';
import { AuthState } from './type';

const initialState: AuthState = {
  accessToken: '',
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.username = payload.username;
      })
      .addCase(login.rejected, (state) => {
        state.accessToken = '';
        state.username = '';
      });

    builder
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.username = payload.username;
      })
      .addCase(refresh.rejected, (state) => {
        state.accessToken = '';
        state.username = '';
      });
  },
});

export const selectAuthUsername = (state: RootState) => state.auth.username;
export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice;
