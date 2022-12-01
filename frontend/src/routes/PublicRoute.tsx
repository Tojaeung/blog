import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const accessToken = localStorage.getItem('accessToken');

  accessToken && alert('이미 로그인되었습니다.');

  return accessToken ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoute;
