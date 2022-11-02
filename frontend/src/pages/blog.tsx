import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import wrapper from 'apps/store';
import axios from 'axios';
import { refresh } from 'features/auth/authThunk';
import { getCategorys } from 'features/category/categoryThunk';
import { getAllPosts } from 'features/post/postThunk';
import { selectAllPostsCnt } from 'features/category/categorySlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import { categorys } from 'constants/practice';

const Blog: NextPage = () => {
  // const categorys = useAppSelector(selectAllPostsCnt);

  return (
    <Container>
      <TitleBox>
        <Title>Blog</Title>
        <AllPostsCnt>전체 ({categorys.length})</AllPostsCnt>
      </TitleBox>
      <BlogCategory />
      <BlogPost />
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
      alert('인증 후 접근 가능합니다.');
      // return {
      //   redirect: {
      //     permanent: false,
      //     destination: '/',
      //   },
      // };
    }
  }

  try {
    await store.dispatch(getCategorys());
  } catch (e) {}

  try {
    await store.dispatch(getAllPosts());
  } catch (e) {}

  return { props: {} };
});

import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Title = styled(CommonTitleStyle)``;
const AllPostsCnt = styled.span`
  background-color: red;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  color: white;
`;

export default Blog;
