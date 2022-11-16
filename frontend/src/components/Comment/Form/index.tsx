import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { createComment } from 'apis/comment';

import * as S from './style';
import { IProp } from './type';

function Form({ commentsState, setComments, parentId }: IProp) {
  const router = useRouter();

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // 부모 댓글이 있는지 없는지
  const handleSubmit = async () => {
    if (!parentId) {
      const newComment = await createComment(Number(router.query.id), author, content, undefined);
      setComments((commentsState) => [...commentsState, newComment]);
      setAuthor('');
      setContent('');
    } else {
      const newComment = await createComment(Number(router.query.id), author, content, parentId);
      const idx = commentsState.findIndex((comment) => comment.id === parentId);
      commentsState[idx].children.push(newComment);
      setComments([...commentsState]);
      setAuthor('');
      setContent('');
    }
  };

  return (
    <S.Container>
      <S.Title>댓글쓰기</S.Title>
      <S.AuthorInput placeholder="이름" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <S.ContentInput placeholder="댓글을 남겨주세요 !!" value={content} onChange={(e) => setContent(e.target.value)} />
      <S.SubmitButton onClick={handleSubmit}>댓글쓰기</S.SubmitButton>
    </S.Container>
  );
}

export default Form;
