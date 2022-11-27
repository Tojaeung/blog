import { createContext, useState } from 'react';
import { IAuth } from 'interfaces/auth';
import { AuthContextType, IProp } from './type';

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: IProp) {
  const [auth, setAuth] = useState<IAuth | null>(null);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
