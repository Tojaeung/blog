import { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import { getCategories } from 'apis/category';
import { getAllPosts } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';
import HeadMeta from 'layouts/HeadMeta';

import { PostType } from 'interfaces/post';
import { CategoryType } from 'interfaces/category';
import { PagePostType } from 'interfaces/post';

interface IProps {
  categories: CategoryType[];
  page1Posts: PagePostType;
}

const Blog: NextPage<IProps> = ({ categories, page1Posts }) => {
  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  useEffect(() => {
    // 중복렌더링 방지
    if (page > 1) getAllPosts(Number(page)).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <Container>
      <HeadMeta
        title="Blog - 토재웅님의 블로그"
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url="https://tojaeung.com/blog"
      />
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

import styled from 'styled-components';
import { CommonBadgeStyle, CommonTitleStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Title = styled(CommonTitleStyle)`
  font-size: 50px;
`;

const AllPostsCnt = styled(CommonBadgeStyle)`
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.mainColor};
  font-size: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.mainColor};
    color: ${({ theme }) => theme.palette.white};
  }
`;

export default Blog;
