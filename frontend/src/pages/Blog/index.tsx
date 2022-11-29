import { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllPosts } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import { IPagePost } from 'interfaces/post';
import { IError } from 'interfaces/error';

import * as S from './style';

function Blog() {
  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: page } = useQuery<IPagePost, IError>(['allPosts'], () => getAllPosts(pageNum));

  return (
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
  );
}

export default Blog;