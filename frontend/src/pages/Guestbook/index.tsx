import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Helmet } from 'react-helmet-async';

import { addGuestbook, deleteGuestbook, getGuestbooks } from 'apis/guestbook';

import HomeCategory from 'components/HomeCategory';

import * as S from './style';

function Guestbook() {
  const queryCache = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const { data: guestbooks } = useQuery(['guestbook'], () => getGuestbooks());
  const { mutate: addGuestbookMutate } = useMutation(addGuestbook, {
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ['guestbook'] });
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });
  const { mutate: deleteGuestbookMutate } = useMutation(deleteGuestbook, {
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ['guestbook'] });
    },
  });

  const handleSubmit = async () => {
    addGuestbookMutate({ author, content, isAdmin: !!accessToken });
    setAuthor('');
    setContent('');
  };

  const handleDelete = async (guestbookId: number) => {
    if (!accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      deleteGuestbookMutate(guestbookId);
      alert('삭제 되었습니다.');
    } else {
      alert('삭제 되지 않았습니다.');
    }
  };

  return (
    <>
      <Helmet>
        <title>방명록 - 토재웅</title>
      </Helmet>
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
                  {accessToken && <S.DeleteButton onClick={() => handleDelete(guestbook.id)}>삭제</S.DeleteButton>}
                </S.AuthorBox>

                <S.Content>{guestbook.content}</S.Content>
              </S.GuestbookList>
            ))}
          </S.GuestbookBox>
        </S.GuestbookSection>
        <HomeCategory />
      </S.Container>
    </>
  );
}

export default Guestbook;
