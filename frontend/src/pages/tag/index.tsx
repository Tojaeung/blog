import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineTag } from 'react-icons/ai';

import { getRefresh } from 'apis/auth';
import { getAllTags } from 'apis/tag';

import { AllTagsType } from 'interfaces/tag';

import * as S from './style';

function Tags() {
  return (
    <S.Container>
      <S.Title># 태그모음</S.Title>

      <S.TagBox>
        {allTags.map((tag) => (
          <Link to={`/tag/${tag.tagName}`} key={tag.id}>
            <S.TagBadge>
              <AiOutlineTag size={15} />
              <S.TagName>{tag.tagName}</S.TagName>
            </S.TagBadge>
          </Link>
        ))}
      </S.TagBox>
    </S.Container>
  );
}

export default Tags;
