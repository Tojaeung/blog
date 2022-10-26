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

  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    await store.dispatch(refresh());
  }

  return { props: { message: 'Message from SSR' } };
});

export default Home;
