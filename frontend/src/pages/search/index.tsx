import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { searchKeyword } from 'apis/search';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import * as S from './style';
import { IProps } from './type';
import { PostType } from 'interfaces/post';

const Search: NextPage<IProps> = ({ categories, page1Posts }) => {
  console.log(page1Posts);

  const router = useRouter();

  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  // 페이지 이동시
  useEffect(() => {
    // 중복렌더링 방지
    if (page > 1) searchKeyword(router.query.keyword as string, page).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <S.Container>
      <BlogCategory categories={categories} />

      <S.TitleBox>
        {page1Posts.totalCnt === 0 ? (
          <S.Title>{router.query.keyword} 검색결과가 없습니다.</S.Title>
        ) : (
          <S.Title>{router.query.keyword} 검색결과</S.Title>
        )}

        <S.PostCntBadge>{page1Posts.totalCnt}</S.PostCntBadge>
      </S.TitleBox>
      <S.Detail>"{router.query.keyword}" 관련된 포스팅을 모아놓았습니다.</S.Detail>

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
  const page1Posts = await searchKeyword(ctx.query.keyword as string, 1);

  return { props: { categories, page1Posts } };
};

export default Search;
