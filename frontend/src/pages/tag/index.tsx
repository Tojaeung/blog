import Link from 'next/link';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import { AiOutlineTag } from 'react-icons/ai';

import { getRefresh } from 'apis/auth';
import { getAllTags } from 'apis/tag';

import HeadMeta from 'layouts/HeadMeta';
import { AllTagsType } from 'interfaces/tag';

interface IProp {
  allTags: AllTagsType[];
}

function Tags({ allTags }: IProp) {
  return (
    <Container>
      <HeadMeta
        title={`모든 #태그 모음 - 토재웅`}
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url={`https://tojaeung.com/tag`}
      />

      <Title># 태그모음</Title>

      <TagBox>
        {allTags.map((tag) => (
          <Link href={`/tag/${tag.tagName}`} key={tag.id}>
            <TagBadge>
              <AiOutlineTag size={15} />
              <TagName>{tag.tagName}</TagName>
            </TagBadge>
          </Link>
        ))}
      </TagBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  await getRefresh();
  const allTags = await getAllTags();

  return { props: { allTags } };
};

import styled from 'styled-components';
import { CommonBadgeStyle, CommonTitleStyle, jittery } from 'styles/globalStyle';

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const Title = styled(CommonTitleStyle)``;
const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const TagBadge = styled(CommonBadgeStyle)`
  display: flex;
  align-items: center;
  gap: 3px;
  animation: ${jittery} 5s infinite;
`;

const TagName = styled.span``;

export default Tags;
