import { useState } from 'react';
import { login } from 'apis/auth';
import * as S from './style';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err: any) {
      alert(err.message);
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
