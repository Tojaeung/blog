import { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { getCategorys } from 'features/category/categoryThunk';
import { getAllPosts } from 'features/post/postThunk';
import { selectAllPostsCnt } from 'features/category/categorySlice';
import { selectTotalCnt } from 'features/post/postSlice';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';
import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

const Blog: NextPage = () => {
  const dispatch = useAppDispatch();
  const allPostsCnt = useAppSelector(selectAllPostsCnt);

  const [page, setPage] = useState(1);
  const totalCnt = useAppSelector(selectTotalCnt);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  useEffect(() => {
    dispatch(getAllPosts({ pageNumber: Number(page) }));
  }, [page]);

  return (
    <Container>
      <TitleBox>
        <Title>Blog</Title>
        <AllPostsCnt>전체 ({allPostsCnt})</AllPostsCnt>
      </TitleBox>
      <BlogCategory />
      <BlogPost />
      <Pagination page={page} setPage={setPage} blockNum={blockNum} setBlockNum={setBlockNum} totalCnt={totalCnt} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = store.getState().auth;

  // 페이지 새로고침시 인증정보 다시 가져오기
  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    await store.dispatch(refresh());
  }

  await store.dispatch(getCategorys());
  await store.dispatch(getAllPosts({ pageNumber: 1 }));

  return { props: {} };
});

import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
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
