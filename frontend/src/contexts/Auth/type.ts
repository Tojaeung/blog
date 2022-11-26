import { ReactNode, Dispatch, SetStateAction } from 'react';
import { AuthType } from 'interfaces/auth';

export type AuthContextType = {
  auth: AuthType | null;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
};

export type IProp = {
  children: ReactNode;
};
