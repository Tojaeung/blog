import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { getPosts } from 'features/post/postThunk';
import { getCategorys } from 'features/category/categoryThunk';
import Intro from 'components/Intro';
import HomePost from 'components/HomePost';
import HomeCategory from 'components/HomeCategory';

const Home: NextPage = () => {
  // const posts = useAppSelector(selectPosts);

  return (
    <Container>
      <Intro />

      <Box>
        <HomePost />
        <HomeCategory />
      </Box>
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
    await store.dispatch(getPosts());
  } catch (e) {}

  return { props: {} };
});

import styled from 'styled-components';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { selectPosts } from 'features/post/postSlice';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

export default Home;
