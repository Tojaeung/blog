import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getRecentPosts } from 'apis/post';

import * as S from './style';

function RecentPosts() {
  const { data: recentPosts } = useQuery('recentPosts', () => getRecentPosts(), {
    staleTime: 0, // 최신정보 받기
  });

  return (
    <S.Container>
      {recentPosts?.map((post) => {
        return (
          <Link to={`/post/${post.id}`} key={post.id}>
            <S.List>
              <S.Thumbnail src={post.thumbnail} alt='썸네일' />

              <S.ContentBox>
                <S.CategoryName>[{post.categoryName}]</S.CategoryName>
                <S.Title>{post.title}</S.Title>

                <S.CreatedAt>{post.createdAt}</S.CreatedAt>
              </S.ContentBox>
            </S.List>
          </Link>
        );
      })}
    </S.Container>
  );
}

export default RecentPosts;
