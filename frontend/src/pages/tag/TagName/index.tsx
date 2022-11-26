import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPostsInTag } from 'apis/tag';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import { PostType } from 'interfaces/post';
import { CategoryType } from 'interfaces/category';
import { PagePostType } from 'interfaces/post';

import * as S from './style';

function TagName() {
  const { tagName } = useParams();

  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  // 페이지 이동시
  useEffect(() => {
    // 중복렌더링 방지
    if (page > 1) getPostsInTag(tagName, page).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <S.Container>
      <BlogCategory categories={categories} />

      <S.TitleBox>
        <S.Title>#{tagName}</S.Title>
        <S.PostCntBadge>{page1Posts.totalCnt}</S.PostCntBadge>
      </S.TitleBox>
      <S.Detail>"#{tagName}" 관련된 포스팅을 모아놓았습니다.</S.Detail>

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

export default TagName;
