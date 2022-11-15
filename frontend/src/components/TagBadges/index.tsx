import React from 'react';
import * as S from './style';
import { IProp } from './type';
import { AiOutlineTag } from 'react-icons/ai';

function TagBadges({ tags }: IProp) {
  return (
    <S.Container>
      {tags.map((tag) => (
        <S.TagBadge key={tag.id}>
          <AiOutlineTag size={15} />
          <S.TagName>{tag.tagName}</S.TagName>
        </S.TagBadge>
      ))}
    </S.Container>
  );
}

export default TagBadges;
