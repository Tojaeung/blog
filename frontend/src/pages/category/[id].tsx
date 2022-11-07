import { GetServerSideProps } from 'next';
import React from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { getCategorys } from 'features/category/categoryThunk';
import { getPostsInCategory } from 'features/post/postSlice';
import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';

const Category = () => {
  const router = useRouter();
  const categorys = useAppSelector(selectCategorys);

  const category = categorys.find((category) => category.id === Number(router.query.id));

  return (
    <Container>
      <TitleBox>
        <Title>{category?.name}</Title>
        <PostsCnt>{category?.postCnt}</PostsCnt>
      </TitleBox>
      <Detail>{category?.name}와 관련된 모든 포스팅을 모아놓았습니다.</Detail>
      <BlogCategory />
      <BlogPost />
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${ctx.query.id}/post`, {
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
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { selectCategorys } from 'features/category/categorySlice';
import { useRouter } from 'next/router';

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
