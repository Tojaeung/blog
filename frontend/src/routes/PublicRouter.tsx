import { useContext } from 'react';
import { AuthContext } from 'contexts/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRouter = () => {
  const accessToken = useContext(AuthContext);

  return accessToken ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRouter;
