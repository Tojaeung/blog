import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { selectCategorys } from 'features/category/categorySlice';
import { refresh } from 'features/auth/authThunk';
import { getCategorys } from 'features/category/categoryThunk';
import { getPostsInCategory, selectTotalCnt } from 'features/post/postSlice';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';
import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';
import Pagination from 'components/Pagination';

const Category = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const categorys = useAppSelector(selectCategorys);
  const category = categorys.find((category) => category.id === Number(router.query.id));

  const [page, setPage] = useState(1);
  const totalCnt = useAppSelector(selectTotalCnt);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${router.query.id}/post?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getPostsInCategory({ posts: res.data }));
      });
  }, [page]);

  return (
    <Container>
      <TitleBox>
        <Title>{category?.name}</Title>
        <PostsCnt>{category?.postCnt}</PostsCnt>
      </TitleBox>
      <Detail>{category?.name}와 관련된 모든 포스팅을 모아놓았습니다.</Detail>
      <BlogCategory />
      <BlogPost />
      <Pagination page={page} setPage={setPage} blockNum={blockNum} setBlockNum={setBlockNum} totalCnt={totalCnt} />
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${ctx.query.id}/post?page=1`, {
      withCredentials: true,
    });
    await store.dispatch(getPostsInCategory({ posts: res.data }));
  } catch (err) {
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
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const PostsCnt = styled.div`
  font-size: 20px;
  background-color: red;
  padding: 10px;
`;

const Title = styled(CommonTitleStyle)``;
const Detail = styled(CommonTextStyle)``;

export default Category;
