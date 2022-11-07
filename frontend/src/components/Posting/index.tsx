import Image from 'next/image';
import React from 'react';
import { selectPost } from 'features/post/postSlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { Container, Detail, ImageBox, Title } from './style';

function Posting() {
  const post = useAppSelector(selectPost);

  return (
    <Container>
      <Title>{post?.title}</Title>
      <Detail>
        {post?.categoryName} | {post?.createdAt} | 조회수 {post?.views}
      </Detail>
      <ImageBox>
        <Image src={post?.thumbnail!} width="800" height="400" alt="포스팅 사진" priority={true} />
      </ImageBox>

      <p>{post?.content}</p>
    </Container>
  );
}

export default Posting;
