import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const accessToken = useContext(AuthContext);

  return accessToken ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoute;
