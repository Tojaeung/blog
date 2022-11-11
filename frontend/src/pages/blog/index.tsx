import { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import { getCategories } from 'apis/category';
import { getAllPosts } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import { AllPostsCnt, Container, Title, TitleBox } from './style';
import { IProps } from './type';
import { PostType } from 'interfaces/post';

const Blog: NextPage<IProps> = ({ categories, page1Posts }) => {
  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  useEffect(() => {
    getAllPosts(Number(page)).then(({ posts }) => {
      setPosts(posts);
    });
  }, [page]);

  return (
    <Container>
      <BlogCategory categories={categories} />
      <TitleBox>
        <Title>Blog</Title>
        <AllPostsCnt>전체 ({page1Posts.totalCnt})</AllPostsCnt>
      </TitleBox>
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
  const categories = await getCategories();
  const page1Posts = await getAllPosts(1);

  return { props: { categories, page1Posts } };
};

export default Blog;
