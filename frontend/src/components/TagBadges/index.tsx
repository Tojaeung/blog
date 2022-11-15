import Link from 'next/link';
import React from 'react';

import { AiOutlineTag } from 'react-icons/ai';

import * as S from './style';
import { IProp } from './type';

function TagBadges({ tags }: IProp) {
  return (
    <S.Container>
      {tags.map((tag) => (
        <Link href={`/tag/${tag.tagName}`}>
          <S.TagBadge key={tag.id}>
            <AiOutlineTag size={15} />
            <S.TagName>{tag.tagName}</S.TagName>
          </S.TagBadge>
        </Link>
      ))}
    </S.Container>
  );
}

export default TagBadges;
