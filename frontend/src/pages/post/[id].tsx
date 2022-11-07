import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { getCategorys } from 'features/category/categoryThunk';
import { getPost } from 'features/post/postSlice';
import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';

const Post = () => {
  return (
    <Container>
      <BlogCategory />
      <Posting />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  const { accessToken } = store.getState().auth;

  // 페이지 새로고침시 인증정보 다시 가져오기
  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    await store.dispatch(refresh());
  }

  await store.dispatch(getCategorys());

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${ctx.query.id}`, {
      withCredentials: true,
    });
    store.dispatch(getPost({ post: res.data }));
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return { props: {} };
});

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default Post;
