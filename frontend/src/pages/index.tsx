import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { getPostsTop5 } from 'features/post/postThunk';
import { getCategorys } from 'features/category/categoryThunk';
import Intro from 'components/Intro';
import HomePost from 'components/HomePost';
import HomeCategory from 'components/HomeCategory';

const Home: NextPage = () => {
  return (
    <Container>
      <Intro />

      <Title>가장 인기있는 포스팅 Top5</Title>
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
    await store.dispatch(refresh());
  }

  await store.dispatch(getCategorys());
  await store.dispatch(getPostsTop5());

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

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const Title = styled(CommonTitleStyle)``;

export default Home;
