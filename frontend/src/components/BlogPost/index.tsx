import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { PostBox, PostList, Content, Detailed, Title } from './style';
import { posts } from 'constants/practice';

const BlogPost = () => {
  return (
    <PostBox>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostList>
              <Image src="/images/profile.jpg" width="300" height="300" alt="포스팅 썸네일" />
              <Title>{post.title}</Title>
              <Content>{post.content}</Content>
              <Detailed>
                {post.createdAt} | {post.views}
              </Detailed>
            </PostList>
          </Link>
        );
      })}
    </PostBox>
  );
};

export default BlogPost;
