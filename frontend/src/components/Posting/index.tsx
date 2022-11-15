import TagBadges from 'components/TagBadges';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import * as S from './style';
import { IProps } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function Posting({ auth, post }: IProps) {
  return (
    <S.Container>
      <S.Title>{post.title}</S.Title>
      <S.Detail>
        {post.categoryName} | {post.createdAt} | 조회수 {post?.views}
      </S.Detail>

      <Image src={post.thumbnail} width={700} height={500} layout="responsive" alt="포스팅 사진" priority={true} />

      <Viewer content={post.content || ''} />

      <S.Line />
      <S.Title>Tags</S.Title>
      {post.tags.length !== 0 && <TagBadges tags={post.tags} />}
    </S.Container>
  );
}

export default Posting;
