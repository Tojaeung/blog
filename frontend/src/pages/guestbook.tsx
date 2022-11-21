import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { deleteGuestbook, getAllGuestbooks } from 'apis/guestbook';
import { createGuestbook } from 'apis/guestbook';

import HomeCategory from 'components/HomeCategory';
import HeadMeta from 'layouts/HeadMeta';

import { GuestbookType } from 'interfaces/guestbook';
import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';

interface IProps {
  auth: AuthType | null;
  categories: CategoryType[];
  guestbooks: GuestbookType[];
}

const Guestbook: NextPage<IProps> = ({ auth, categories, guestbooks }) => {
  const [guestbooksState, setGuestbooks] = useState<GuestbookType[]>(guestbooks);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!auth?.accessToken) {
      console.log(auth?.accessToken);
      const newGuestbook = await createGuestbook(author, content, false);
      setGuestbooks((guestbooksState) => [...guestbooksState, newGuestbook]);
      setAuthor('');
      setContent('');
    } else {
      const newGuestbook = await createGuestbook(author, content, true);
      setGuestbooks((guestbooksState) => [...guestbooksState, newGuestbook]);
      setAuthor('');
      setContent('');
    }
  };

  const handleDeleteGuestbook = async (guestbookId: number) => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      const deletedId = await deleteGuestbook(guestbookId, auth.accessToken);
      alert('삭제 되었습니다.');
      setGuestbooks([...guestbooksState.filter((guestbook) => guestbook.id !== deletedId)]);
    } else {
      alert('삭제 되지 않았습니다.');
    }
  };

  return (
    <Container>
      <HeadMeta
        title={`방명록 - 토재웅님의 블로그`}
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url={`https://tojaeung.com/guestbook`}
      />

      <GuestbookSection>
        <Title>방명록</Title>

        <FormBox>
          <AuthorInput placeholder="이름" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <ContentInput
            placeholder="여러분의 소중한 방명록을 남겨주세요!! 🙏"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton onClick={handleSubmit}>방명록 남기기</SubmitButton>
        </FormBox>

        <GuestbookBox>
          {guestbooksState.map((guestbook) => (
            <GuestbookList key={guestbook.id}>
              <AuthorBox>
                {/* 관리자 방명록일 경우 스타일 추가 */}
                <Author>{!guestbook.isAdmin ? guestbook.author : `👑${guestbook.author}`}</Author>
                <DateTime>({guestbook.createdAt})</DateTime>
                {auth?.accessToken && (
                  <DeleteButton onClick={(e) => handleDeleteGuestbook(guestbook.id)}>삭제</DeleteButton>
                )}
              </AuthorBox>

              <Content>{guestbook.content}</Content>
            </GuestbookList>
          ))}
        </GuestbookBox>
      </GuestbookSection>
      <HomeCategory categories={categories} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  const auth = await getRefresh();
  const categories = await getCategories();
  const guestbooks = await getAllGuestbooks();

  return { props: { auth, categories, guestbooks } };
};

import styled from 'styled-components';
import {
  CommonButtonStyle,
  CommonCommentStyle,
  CommonInputStyle,
  CommonTextStyle,
  CommonTitleStyle,
} from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  margin-top: 30px;

  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
`;

const GuestbookSection = styled.section`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
`;

const Title = styled(CommonTitleStyle)``;

const GuestbookBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 5px;
  padding: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;

const GuestbookList = styled.li`
  background-color: ${({ theme }) => theme.palette.badgeColor};
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AuthorBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Author = styled(CommonTextStyle)`
  font-weight: bold;
`;
const DateTime = styled(CommonTextStyle)`
  font-weight: normal;
  font-size: 12px;
`;
const DeleteButton = styled.button`
  cursor: pointer;
`;

const Content = styled(CommonTextStyle)``;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;

const AuthorInput = styled(CommonInputStyle)`
  width: 50%;
`;
const ContentInput = styled(CommonCommentStyle)`
  width: 100%;
  min-height: 100px;
`;
const SubmitButton = styled(CommonButtonStyle)`
  width: 18%;
  min-width: 100px;
`;

export default Guestbook;
