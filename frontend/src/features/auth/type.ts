///////// slice /////////////

export type AuthState = {
  accessToken: string;
  username: string;
};

//////// thunk //////////////
export type LoginReturnType = {
  accessToken: string;
  username: string;
};

export type LoginParamType = {
  username: string;
  password: string;
};

export type RefreshReturnType = {
  accessToken: string;
  username: string;
};

export type RefreshParamType = {
  refreshToken: string;
};
