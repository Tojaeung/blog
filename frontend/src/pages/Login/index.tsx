import { useState, useContext } from 'react';

import { AuthContext } from 'contexts/Auth';
import { IAuthContext } from 'contexts/Auth/type';

import { login } from 'apis/auth';

import * as S from './style';

function Login() {
  const { setAuth } = useContext(AuthContext) as IAuthContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = await login(username, password);
      setAuth(auth);
      localStorage.setItem('accessToken', auth.accessToken);
      alert('로그인 되었습니다.');
    } catch (err) {
      alert('로그인 실패하였습니다.');
    }
  };

  return (
    <S.Container>
      <S.Title>관리자 로그인</S.Title>
      <S.LoginBox>
        <S.IdInput placeholder='관리자ID' onChange={(e) => setUsername(e.target.value)} />
        <S.PwInput type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
      </S.LoginBox>
    </S.Container>
  );
}

export default Login;
