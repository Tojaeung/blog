import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPostsInTag } from 'apis/tag';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';
import HeadMeta from 'layouts/HeadMeta';

import * as S from './style';
import { IProps } from './type';
import { PostType } from 'interfaces/post';

const Tag: NextPage<IProps> = ({ categories, page1Posts }) => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  // 페이지 이동시
  useEffect(() => {
    // 중복렌더링 방지
    if (page > 1) getPostsInTag(router.query.tagName as string, page).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <S.Container>
      <HeadMeta
        title={`#${router.query.tagName} - 토재웅`}
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url={`https://tojaeung.com/tag/${router.query.tagName}`}
      />
      <BlogCategory categories={categories} />

      <S.TitleBox>
        <S.Title># {router.query.name}</S.Title>
        <S.PostCntBadge>{page1Posts.totalCnt}</S.PostCntBadge>
      </S.TitleBox>
      <S.Detail>"#{router.query.name}" 관련된 포스팅을 모아놓았습니다.</S.Detail>

      <BlogPost posts={posts} />

      <Pagination
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        totalCnt={page1Posts.totalCnt}
      />
    </S.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  await getRefresh();
  const categories = await getCategories();

  let page1Posts;
  try {
    page1Posts = await getPostsInTag(ctx.query.tagName as string, 1);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return { props: { categories, page1Posts } };
};

export default Tag;
