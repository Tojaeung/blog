import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { login, refresh } from 'features/auth/authThunk';
import { useAppDispatch } from 'hooks/useRtkCustomHook';

const Login: NextPage = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(login({ username, password }));
    } catch (err) {
      alert('로그인 실패 !!');
    }
  };

  return (
    <Container>
      <Title>관리자 로그인</Title>
      <LoginBox>
        <IdInput placeholder="관리자ID" onChange={(e) => setUsername(e.target.value)} />
        <PwInput placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginBox>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = store.getState().auth;

  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    await store.dispatch(refresh());
  }

  return { props: { message: 'Message from SSR' } };
});

import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 500px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const Title = styled(CommonTitleStyle)``;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const IdInput = styled(CommonInputStyle)``;
const PwInput = styled(CommonInputStyle)``;
const LoginButton = styled(CommonButtonStyle)``;

export default Login;
