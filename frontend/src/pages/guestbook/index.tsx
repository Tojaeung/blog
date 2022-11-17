import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { deleteGuestbook, getAllGuestbooks } from 'apis/guestbook';

import HomeCategory from 'components/HomeCategory';
import Form from './Form';
import HeadMeta from 'layouts/HeadMeta';

import * as S from './style';
import { IProps } from './type';
import { GuestbookType } from 'interfaces/guestbook';

const Guestbook: NextPage<IProps> = ({ auth, categories, guestbooks }) => {
  const [guestbooksState, setguestbooks] = useState<GuestbookType[]>(guestbooks);

  const handleDeleteGuestbook = async (guestbookId: number) => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      const deletedId = await deleteGuestbook(guestbookId, auth.accessToken);
      alert('삭제 되었습니다.');
      setguestbooks([...guestbooksState.filter((guestbook) => guestbook.id !== deletedId)]);
    } else {
      alert('삭제 되지 않았습니다.');
    }
  };

  return (
    <S.Container>
      <HeadMeta
        title={`방명록 - 토재웅님의 블로그`}
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url={`https://tojaeung.com/guestbook`}
      />

      <S.GuestbookSection>
        <S.Title>방명록</S.Title>

        <Form setGuestbooks={setguestbooks} auth={auth} />

        <S.GuestbookBox>
          {guestbooksState.map((guestbook) => (
            <S.GuestbookList key={guestbook.id}>
              <S.AuthorBox>
                {/* 관리자 방명록일 경우 스타일 추가 */}
                <S.Author>{!guestbook.isAdmin ? guestbook.author : `👑${guestbook.author}`}</S.Author>
                <S.DateTime>({guestbook.createdAt})</S.DateTime>
                {auth?.accessToken && (
                  <S.DeleteButton onClick={(e) => handleDeleteGuestbook(guestbook.id)}>삭제</S.DeleteButton>
                )}
              </S.AuthorBox>

              <S.Content>{guestbook.content}</S.Content>
            </S.GuestbookList>
          ))}
        </S.GuestbookBox>
      </S.GuestbookSection>
      <HomeCategory categories={categories} />
    </S.Container>
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

export default Guestbook;
