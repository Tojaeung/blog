import { useParams } from 'react-router-dom';
import { useState } from 'react';

import useCommentQuery from 'hooks/useCommentQuery';

import * as S from './style';
import { IProp } from './type';

function Form({ parentId }: IProp) {
  const { postId } = useParams();

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const { addCommentMutation, addChildCommentMutation } = useCommentQuery();

  // 부모 댓글이 있는지 없는지
  const handleSubmit = async () => {
    if (!parentId) {
      const newComment = { author, content, postId: Number(postId) };
      addCommentMutation.mutate(newComment);
      setAuthor('');
      setContent('');
    } else {
      const newChildComment = { author, content, postId: Number(postId), parentId };
      addChildCommentMutation.mutate(newChildComment);
      setAuthor('');
      setContent('');
    }
  };

  return (
    <S.Container>
      <S.Title>댓글쓰기</S.Title>
      <S.AuthorInput placeholder='이름' value={author} onChange={(e) => setAuthor(e.target.value)} />
      <S.ContentInput placeholder='댓글을 남겨주세요 !!' value={content} onChange={(e) => setContent(e.target.value)} />
      <S.SubmitButton onClick={handleSubmit}>댓글쓰기</S.SubmitButton>
    </S.Container>
  );
}

export default Form;
