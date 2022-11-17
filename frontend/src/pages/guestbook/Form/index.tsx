import React, { useState } from 'react';

import { createGuestbook } from 'apis/guestbook';

import * as S from './style';
import { IProp } from './type';

function Form({ setGuestbooks, auth }: IProp) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    console.log(!auth?.accessToken);

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

  return (
    <S.Container>
      <S.AuthorInput placeholder="이름" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <S.ContentInput
        placeholder="여러분의 소중한 방명록을 남겨주세요!! 🙏"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <S.SubmitButton onClick={handleSubmit}>방명록 남기기</S.SubmitButton>
    </S.Container>
  );
}

export default Form;
