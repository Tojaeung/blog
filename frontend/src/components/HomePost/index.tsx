import Image from 'next/image';
import React from 'react';
import { selectPosts } from 'features/post/postSlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { posts } from 'constants/practice';
import { PostTitle, PostBox, PostList, TextBox, Content, Detailed, Title, ImageBox } from './style';

function HomePost() {
  // const posts = useAppSelector(selectPosts);

  return (
    <PostBox>
      <Title>가장 인기있는 Top5</Title>
      {posts.map((post) => {
        return (
          <PostList key={post.id}>
            <ImageBox>
              <Image src={post.thumbnail} width="200" height="200" alt="포스팅 썸네일" />
            </ImageBox>
            <TextBox>
              <PostTitle>{post.title}</PostTitle>
              <Content>{post.content}</Content>
              <Detailed>
                {post.createdAt} | 조회수 {post.views}
              </Detailed>
            </TextBox>
          </PostList>
        );
      })}
    </PostBox>
  );
}

export default HomePost;
