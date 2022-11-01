import wrapper from 'apps/store';
import axios from 'axios';
import { refresh } from 'features/auth/authThunk';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = () => {
  return <div>토재웅</div>;
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

  return { props: { message: 'Message from SSR' } };
});

export default Home;
