import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';

const Admin: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <GoCategory onClick={(e) => router.push('/admin/category')}>카테고리 수정 하러가기</GoCategory>
      <GoPost onClick={(e) => router.push('/admin/post')}>포스팅 하러가기</GoPost>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = store.getState().auth;

  // 페이지 새로고침시 인증정보 다시 가져오기
  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    try {
      await store.dispatch(refresh());
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
  }

  // 인증정보(리프레쉬, 엑세스 토큰) 없을시 접근불가 홈페이지로 리다이렉트
  if (!refreshToken && accessToken === '') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return { props: { message: 'Message from SSR' } };
});

import styled from 'styled-components';
import { CommonButtonStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
`;
const GoCategory = styled(CommonButtonStyle)``;
const GoPost = styled(CommonButtonStyle)``;

export default Admin;
