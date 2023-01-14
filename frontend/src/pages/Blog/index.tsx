import { useState } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';

import { getAllPosts } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import * as S from './style';

function Blog() {
  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: page } = useQuery(['allPosts', pageNum], () => getAllPosts(pageNum));

  return (
    <>
      <Helmet>
        <title>블로그 - 토재웅</title>
      </Helmet>

      <S.Container>
        <BlogCategory />
        <S.TitleBox>
          <S.Title>Blog</S.Title>
          <S.AllPostsCnt>전체 ({page?.totalCnt})</S.AllPostsCnt>
        </S.TitleBox>
        <BlogPost posts={page?.posts} />
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalCnt={page?.totalCnt}
        />
      </S.Container>
    </>
  );
}

export default Blog;
