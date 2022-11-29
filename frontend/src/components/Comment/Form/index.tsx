import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import { addComment, addChildComment } from 'apis/comment';

import * as S from './style';
import { IProp } from './type';

function Form({ parentId }: IProp) {
  const { invalidateQueries } = useQueryClient();
  const { postId } = useParams();

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const { mutate: addCommentMutate } = useMutation(addComment, {
    onSuccess: () => {
      invalidateQueries({ queryKey: ['comment', postId] });
    },
  });
  const { mutate: addChildCommentMutate } = useMutation(addChildComment, {
    onSuccess: () => {
      invalidateQueries({ queryKey: ['comment', postId] });
    },
  });

  // 부모 댓글이 있는지 없는지
  const handleSubmit = async () => {
    if (!parentId) {
      addCommentMutate({ author, content, postId: Number(postId) });
      setAuthor('');
      setContent('');
    } else {
      addChildCommentMutate({ author, content, postId: Number(postId), parentId });
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
