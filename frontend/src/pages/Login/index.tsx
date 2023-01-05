import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from 'apis/auth';

import MetaTag from 'layouts/MetaTag';

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
      <MetaTag
        title='로그인 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        url='https://tojaeung.com/login'
      />
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
