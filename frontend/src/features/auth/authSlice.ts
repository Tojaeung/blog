import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../apps/store';

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    // builder
    //   .addCase(signIn.fulfilled, (state, { payload }) => {
    //     state.ok = payload.ok;
    //     state.message = payload.message;
    //     state.user = payload.user;
    //   })
    //   .addCase(signIn.rejected, (state, { payload }) => {
    //     state.ok = payload?.ok!;
    //     state.message = payload?.message!;
    //   });
  },
});

// export const selectUserOk = (state: RootState) => state.user.ok;
// export const selectUserMessage = (state: RootState) => state.user.message;
// export const selectUserUser = (state: RootState) => state.user.user;

export default authSlice;
