import { ReactNode, Dispatch, SetStateAction } from 'react';
import { IAuth } from 'interfaces/auth';

export type IAuthContext = {
  auth?: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth | undefined>>;
};

export type IProp = {
  children: ReactNode;
};
