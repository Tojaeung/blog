import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import { Container, Detail, Title } from './style';
import { IProps } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function Posting({ auth, post }: IProps) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Detail>
        {post.categoryName} | {post.createdAt} | 조회수 {post?.views}
      </Detail>

      <Image src={post.thumbnail} width={700} height={500} layout="responsive" alt="포스팅 사진" priority={true} />

      <Viewer content={post.content || ''} />
    </Container>
  );
}

export default Posting;
