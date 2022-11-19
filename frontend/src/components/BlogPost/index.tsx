import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import * as S from './style';
import { IProp } from './type';

import TagBadges from 'components/TagBadges';

const Viewer = dynamic(() => import('components/Editor/CardViewer'), { ssr: false });

function BlogPost({ posts }: IProp) {
  return (
    <S.PostBox>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <S.PostList>
              <Image
                src={post.thumbnail}
                width="300"
                height="300"
                layout="responsive"
                alt="포스팅 썸네일"
                priority={true}
              />
              <S.Title>{post.title}</S.Title>

              <Viewer content={post.content} />

              {post.tags.length !== 0 && <TagBadges tags={post.tags} />}

              <S.Detailed>
                {post.createdAt} | 조회수 {post.views}
              </S.Detailed>
            </S.PostList>
          </Link>
        );
      })}
    </S.PostBox>
  );
}

export default BlogPost;
