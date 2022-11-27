import { useState, useContext } from 'react';

import { AuthContext } from 'contexts/Auth';
import { AuthContextType } from 'contexts/Auth/type';

import useGuestbookQuery from 'hooks/useGuestbookQuery';

import HomeCategory from 'components/HomeCategory';

import { INewGuestbook } from 'interfaces/guestbook';

import * as S from './style';

function Guestbook() {
  const { auth } = useContext(AuthContext) as AuthContextType;

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const { addGuestbookMutation, deleteGuestbookMutation, fetchGuestbooksQuery } = useGuestbookQuery();

  const { data: guestbooks } = fetchGuestbooksQuery();

  const handleSubmit = async () => {
    const newGuestbook: INewGuestbook = { author, content, isAdmin: !!auth?.accessToken };
    addGuestbookMutation.mutate(newGuestbook);
    setAuthor('');
    setContent('');
  };

  const handleDelete = async (guestbookId: number) => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      deleteGuestbookMutation.mutate(guestbookId);
      alert('삭제 되었습니다.');
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
          {guestbooks?.map((guestbook) => (
            <S.GuestbookList key={guestbook.id}>
              <S.AuthorBox>
                {/* 관리자 방명록일 경우 스타일 추가 */}
                <S.Author>{!guestbook.isAdmin ? guestbook.author : `👑${guestbook.author}`}</S.Author>
                <S.DateTime>({guestbook.createdAt})</S.DateTime>
                {auth?.accessToken && <S.DeleteButton onClick={() => handleDelete(guestbook.id)}>삭제</S.DeleteButton>}
              </S.AuthorBox>

              <S.Content>{guestbook.content}</S.Content>
            </S.GuestbookList>
          ))}
        </S.GuestbookBox>
      </S.GuestbookSection>
      <HomeCategory />
    </S.Container>
  );
}

export default Guestbook;
