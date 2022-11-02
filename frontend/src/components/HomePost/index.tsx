import Image from 'next/image';
import React from 'react';
import { selectPosts } from 'features/post/postSlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { posts } from 'constants/practice';
import { PostBox, PostList, TextBox, Content, Detailed, Title, ImageBox } from './style';
import Link from 'next/link';

function HomePost() {
  // const posts = useAppSelector(selectPosts);

  return (
    <PostBox>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostList>
              <ImageBox>
                <Image src={post.thumbnail} width="200" height="200" alt="포스팅 썸네일" />
              </ImageBox>
              <TextBox>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
                <Detailed>
                  {post.createdAt} | 조회수 {post.views}
                </Detailed>
              </TextBox>
            </PostList>
          </Link>
        );
      })}
    </PostBox>
  );
}

export default HomePost;
