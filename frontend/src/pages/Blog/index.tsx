import { useState, useEffect } from 'react';

import { getAllPosts } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import { PostType } from 'interfaces/post';

import * as S from './style';
import { IProps } from './type';

function Blog({ categories, page1Posts }: IProps) {
  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  useEffect(() => {
    // 중복렌더링 방지
    if (page > 1) getAllPosts(Number(page)).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <S.Container>
      <BlogCategory categories={categories} />
      <S.TitleBox>
        <S.Title>Blog</S.Title>
        <S.AllPostsCnt>전체 ({page1Posts.totalCnt})</S.AllPostsCnt>
      </S.TitleBox>
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
}

export default Blog;
