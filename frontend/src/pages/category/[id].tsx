import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getCategories } from 'apis/category';
import { getPostsInCategory } from 'apis/post';

import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';
import Pagination from 'components/Pagination';

import { PostType } from 'interfaces/post';

import { Container, Detail, PostCntBadge, Title, TitleBox } from './style';
import { IProps } from './type';

const Category: NextPage<IProps> = ({ categories, page1Posts }) => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);
  const selectedCategory = categories.find((category) => category.id === Number(router.query.id));

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  // 카테고리 이동시
  useEffect(() => {
    setPosts(page1Posts.posts);
  }, [router.query.id]);

  // 페이지 이동시
  useEffect(() => {
    if (page > 1) getPostsInCategory(Number(router.query.id), page).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <Container>
      <BlogCategory categories={categories} />
      <TitleBox>
        <Title>{selectedCategory?.name}</Title>
        <PostCntBadge>{selectedCategory?.postCnt}</PostCntBadge>
      </TitleBox>
      <Detail>"{selectedCategory?.name}" 관련된 포스팅을 모아놓았습니다.</Detail>
      <BlogPost posts={posts} />
      <Pagination
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        totalCnt={page1Posts.totalCnt}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  const categories = await getCategories();

  let page1Posts;
  try {
    page1Posts = await getPostsInCategory(Number(ctx.query.id), 1);
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return { props: { categories, page1Posts } };
};

export default Category;
