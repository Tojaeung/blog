import Intro from 'components/Intro';
import HomePost from 'components/HomePost';
import HomeCategory from 'components/HomeCategory';

import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function Home() {
  return (
    <>
      <MetaTag
        title='토재웅님의 블로그'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        url='https://tojaeung.com'
      />
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
