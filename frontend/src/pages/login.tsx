import Router from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';

import { getRefresh, login } from 'apis/auth';

import { AuthType } from 'interfaces/auth';

const Login: NextPage<AuthType> = (auth) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      alert('로그인 되었습니다.');
      Router.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (auth.accessToken) return <p>이미 {auth.username}님은 로그인 하셨습니다.</p>;
  else {
    return (
      <Container>
        <Title>관리자 로그인</Title>
        <LoginBox>
          <IdInput placeholder="관리자ID" onChange={(e) => setUsername(e.target.value)} />
          <PwInput type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </LoginBox>
      </Container>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;

  if (!refreshToken) {
    return {
      props: {},
    };
  } else {
    axios.defaults.headers.Cookie = refreshToken;

    const auth = await getRefresh();

    return {
      props: {
        auth,
      },
    };
  }
};

import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 170px);
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  background-color: ${({ theme }) => theme.palette.white};
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
