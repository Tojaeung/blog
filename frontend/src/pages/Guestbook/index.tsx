import React, { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from 'contexts/auth';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { deleteGuestbook, getAllGuestbooks } from 'apis/guestbook';
import { createGuestbook } from 'apis/guestbook';

import HomeCategory from 'components/HomeCategory';

import { GuestbookType } from 'interfaces/guestbook';
import { CategoryType } from 'interfaces/category';

import * as S from './style';
import { IProps } from './type';

function Guestbook({ categories, guestbooks }: IProps) {
  const accessToken = useContext(AuthContext);

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
    <S.Container>
      <S.GuestbookSection>
        <S.Title>방명록</S.Title>

        <S.FormBox>
          <S.AuthorInput placeholder='이름' value={author} onChange={(e) => setAuthor(e.target.value)} />
          <S.ContentInput
            placeholder='여러분의 소중한 방명록을 남겨주세요!! 🙏'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <S.SubmitButton onClick={handleSubmit}>방명록 남기기</S.SubmitButton>
        </S.FormBox>

        <S.GuestbookBox>
          {guestbooksState.map((guestbook) => (
            <S.GuestbookList key={guestbook.id}>
              <S.AuthorBox>
                {/* 관리자 방명록일 경우 스타일 추가 */}
                <S.Author>{!guestbook.isAdmin ? guestbook.author : `👑${guestbook.author}`}</S.Author>
                <S.DateTime>({guestbook.createdAt})</S.DateTime>
                {accessToken && (
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
}

export default Guestbook;
