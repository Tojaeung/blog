import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { login } from 'apis/auth';

import * as S from './style';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = await login(username, password);
      localStorage.setItem('accessToken', auth.accessToken);
      navigate('/');
      alert('로그인 되었습니다.');
    } catch (err) {
      alert('로그인 실패하였습니다.');
    }
  };

  return (
    <>
      <Helmet>
        <title>로그인 - 토재웅</title>
      </Helmet>
      <S.Container>
        <S.Title>관리자 로그인</S.Title>
        <S.LoginBox>
          <S.IdInput placeholder='관리자ID' onChange={(e) => setUsername(e.target.value)} />
          <S.PwInput type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
          <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
        </S.LoginBox>
      </S.Container>
    </>
  );
}

export default Login;
