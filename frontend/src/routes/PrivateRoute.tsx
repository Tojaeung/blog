import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('accessToken');

  !accessToken && alert('로그인 후 이용 가능합니다.');

  return accessToken ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
