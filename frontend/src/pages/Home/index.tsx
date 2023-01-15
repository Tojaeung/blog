import Intro from 'components/Intro';
import HomePost from 'components/HomePost';
import HomeCategory from 'components/HomeCategory';

import * as S from './style';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>토재웅님의 블로그</title>
      </Helmet>
      <S.Container>
        <Intro />
        <S.Title>가장 인기있는 포스팅 Top5</S.Title>
        <S.Box>
          <HomePost />
          <HomeCategory />
        </S.Box>
      </S.Container>
    </>
  );
}

export default Home;
