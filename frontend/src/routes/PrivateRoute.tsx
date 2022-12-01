import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from 'contexts/Auth';
import { IAuthContext } from 'contexts/Auth/type';

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext) as IAuthContext;
  console.log(auth?.accessToken);

  !auth?.accessToken && alert('로그인 후 이용 가능합니다.');

  return auth?.accessToken ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
