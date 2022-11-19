import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { getRefresh } from 'apis/auth';

import { Container, GoCategory, GoPost } from './style';

const Admin: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <GoCategory onClick={(e) => router.push('/admin/category')}>카테고리 수정 하러가기</GoCategory>
      <GoPost onClick={(e) => router.push('/admin/post')}>포스팅 하러가기</GoPost>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  // 인증정보 없다면 접근불가
  if (!refreshToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  } else {
    axios.defaults.headers.Cookie = refreshToken;
    const auth = await getRefresh();
    // 엑세스 토큰을 응답받지 못하면 접근불가
    if (!auth) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  }

  return { props: {} };
};

export default Admin;