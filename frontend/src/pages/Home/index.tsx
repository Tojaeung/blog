import { Helmet } from 'react-helmet-async';

import Intro from 'components/Intro';
import HotPosts from 'components/HotPosts';
import BlogCategory from 'components/BlogCategory';
import DecoratorBadge from 'components/DecoratorBadge';

import * as S from './style';
import RecentComments from 'components/RecentComments';
import RecentPosts from 'components/RecentPosts';

function Home() {
  return (
    <>
      <Helmet>
        <title>토재웅님의 블로그</title>
      </Helmet>
      <S.Container>
        <Intro />
        <S.Box>
          <S.LeftSideBox>
            <S.HotPostsTitle>가장 인기있는 포스팅🔥</S.HotPostsTitle>
            <HotPosts />
          </S.LeftSideBox>

          <S.RightSideBox>
            <S.ContentBox>
              <S.Title>카테고리</S.Title>
              <BlogCategory />
            </S.ContentBox>

            <S.ContentBox>
              <S.TitleBox>
                <S.Title>최근 댓글</S.Title>
                <DecoratorBadge text='new' />
              </S.TitleBox>
              <RecentComments />
            </S.ContentBox>

            <S.ContentBox>
              <S.TitleBox>
                <S.Title>최근 포스팅</S.Title>
                <DecoratorBadge text='new' />
              </S.TitleBox>
              <RecentPosts />
            </S.ContentBox>
          </S.RightSideBox>
        </S.Box>
      </S.Container>
    </>
  );
}

export default Home;
