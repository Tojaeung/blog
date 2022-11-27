import { ReactNode, Dispatch, SetStateAction } from 'react';
import { IAuth } from 'interfaces/auth';

export type IAuthContext = {
  auth: IAuth | null;
  setAuth: Dispatch<SetStateAction<IAuth | null>>;
};

export type IProp = {
  children: ReactNode;
};
