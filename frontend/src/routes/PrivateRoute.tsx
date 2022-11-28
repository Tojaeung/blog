import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const accessToken = useContext(AuthContext);

  !accessToken && alert('로그인 후 이용 가능합니다.');

  return accessToken ? <Outlet /> : <Navigate to='/login' />;
};

export default PublicRoute;
