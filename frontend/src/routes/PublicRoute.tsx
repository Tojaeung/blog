import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from 'contexts/Auth';
import { IAuthContext } from 'contexts/Auth/type';

const PublicRoute = () => {
  const { auth } = useContext(AuthContext) as IAuthContext;

  return auth?.accessToken ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoute;
