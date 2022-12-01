import { createContext, useState } from 'react';
import { IAuth } from 'interfaces/auth';
import { IAuthContext, IProp } from './type';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({ children }: IProp) {
  const [auth, setAuth] = useState<IAuth | undefined>(undefined);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
