import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import { Container, Detail, ImageBox, Title } from './style';
import { IProps } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function Posting({ auth, post }: IProps) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Detail>
        {post.categoryName} | {post.createdAt} | 조회수 {post?.views}
      </Detail>
      <ImageBox>
        <Image src={post.thumbnail} width="800" height="400" alt="포스팅 사진" priority={true} />
      </ImageBox>

      <Viewer content={post.content || ''} />
    </Container>
  );
}

export default Posting;
