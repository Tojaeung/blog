import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { PostBox, PostList, ViewBox, Detailed, Title } from './style';
import { IProp } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function BlogPost({ posts }: IProp) {
  return (
    <PostBox>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostList>
              <Image src="/images/profile.jpg" width="300" height="300" alt="포스팅 썸네일" priority={true} />
              <Title>{post.title}</Title>
              <ViewBox>
                <Viewer content={post.content} />
              </ViewBox>
              <Detailed>
                {post.createdAt} | {post.views}
              </Detailed>
            </PostList>
          </Link>
        );
      })}
    </PostBox>
  );
}

export default BlogPost;
