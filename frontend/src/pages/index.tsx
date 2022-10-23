import type { GetServerSideProps, NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeadMeta from 'components/HeadMeta';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';
import { login, refresh } from 'features/auth/authThunk';
import { selectAuthUsername } from 'features/auth/authSlice';
import { adminInstance, apiInstance } from 'apps/axios';
import wrapper from 'apps/store';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, []);

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
      <LoginBox>
        <IdInput onChange={(e) => setUsername(e.target.value)} />
        <PwInput onChange={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginBox>

      <button
        onClick={async (e) => {
          try {
            e.preventDefault();
            await adminInstance.get('/admin/test').then((res) => alert(JSON.stringify(res.data)));
          } catch (err) {}
        }}
      >
        test
      </button>
    </Container>
  );
};

// SSR: 서버에서 구동되는 영역
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      console.log(123);

      // 서버 영역에서 Redux 사용
      await store.dispatch(refresh());

      return { props: { message: 'Message from SSR' } };
    },
);

const Container = styled.div`
  border: 1px solid;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IdInput = styled.input``;
const PwInput = styled.input``;
const LoginButton = styled.button``;

export default Home;
