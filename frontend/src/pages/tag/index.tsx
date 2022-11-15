import Link from 'next/link';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import { AiOutlineTag } from 'react-icons/ai';

import { getRefresh } from 'apis/auth';
import { getAllTags } from 'apis/tag';

import * as S from './style';
import { IProp } from './type';

function Tags({ allTags }: IProp) {
  return (
    <S.Container>
      <S.Title># 태그모음</S.Title>

      <S.TagBox>
        {allTags.map((tag) => (
          <Link href={`/tag/${tag.tagName}`} key={tag.id}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  await getRefresh();
  const allTags = await getAllTags();

  return { props: { allTags } };
};

export default Tags;
