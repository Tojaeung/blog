import Link from 'next/link';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import { AiOutlineTag } from 'react-icons/ai';

import { getRefresh } from 'apis/auth';
import { getAllTags } from 'apis/tag';

import HeadMeta from 'layouts/HeadMeta';

import * as S from './style';
import { IProp } from './type';

function Tags({ allTags }: IProp) {
  return (
    <S.Container>
      <HeadMeta
        title={`모든 #태그 모음 - 토재웅`}
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url={`https://tojaeung.com/tag`}
      />

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
