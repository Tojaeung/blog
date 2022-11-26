import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { getCategories } from 'apis/category';
import { getPostsInCategory } from 'apis/post';

import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';
import Pagination from 'components/Pagination';
import HeadMeta from 'layouts/HeadMeta';

import { PostType } from 'interfaces/post';

import * as S from './style';

function Category() {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState<PostType[]>(page1Posts.posts);
  const selectedCategory = categories.find((category) => category.id === Number(categoryId));

  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  // 카테고리 이동시
  useEffect(() => {
    setPosts(page1Posts.posts);
  }, [categoryId]);

  // 페이지 이동시
  useEffect(() => {
    if (page > 1) getPostsInCategory(Number(categoryId), page).then(({ posts }) => setPosts(posts));
  }, [page]);

  return (
    <S.Container>
      <BlogCategory categories={categories} />
      <S.TitleBox>
        <S.Title>{selectedCategory?.name}</S.Title>
        <S.PostCntBadge>{selectedCategory?.postCnt}</S.PostCntBadge>
      </S.TitleBox>
      <S.Detail>"{selectedCategory?.name}" 관련된 포스팅을 모아놓았습니다.</S.Detail>
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

export default Category;
